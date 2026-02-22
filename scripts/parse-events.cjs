const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'events_rows.json'), 'utf8'));
const GOOGLE_FORM = "https://docs.google.com/forms/d/e/1FAIpQLSfm2D_OiVT7J-GcVwjoqfIi7oTsnNOuTB0gsi_LKivSbWUvaA/viewform?pli=1";

function getDept(desc) {
    const m = desc.match(/Department:\s*(.+)/i);
    if (!m) return 'Other';
    let d = m[1].trim().replace(/\n.*/, '').trim();
    // Normalize civil
    if (d === 'CIVIL SYMPOSIUM') d = 'CIVIL ENGINEERING';
    return d;
}
function getField(desc, field) {
    const regex = new RegExp(`- ${field}:\\s*(.+)`, 'i');
    const m = desc.match(regex);
    return m ? m[1].trim() : '';
}
function getRules(desc) {
    const m = desc.match(/Rules\s*&\s*Regulation[s]?:\s*([\s\S]*?)(?:\n-\s*(?:Student|Faculty|STUDENT|FACULTY)\s*[Cc]o|$)/i);
    return m ? m[1].trim() : '';
}
function getCoordinators(desc) {
    const coords = [];
    const seen = new Set();
    const lines = desc.split('\n');
    for (const line of lines) {
        const isStudent = /student\s*co-?ordinator/i.test(line);
        const isFaculty = /faculty\s*coordinator/i.test(line);
        if (!isStudent && !isFaculty) continue;
        // Extract name(phone) patterns
        const matches = [...line.matchAll(/([A-Za-z][A-Za-z.\s']+?)\s*\((\d[\d\s-]+)\)/g)];
        if (matches.length > 0) {
            for (const m of matches) {
                let name = m[1].replace(/^(Mr\.|Ms\.|Dr\.|Er\.)\s*/i, '').trim();
                const phone = m[2].replace(/[\s-]/g, '');
                const key = name.toLowerCase();
                if (!seen.has(key) && name.length > 1) {
                    seen.add(key);
                    coords.push({ name, phone, email: '' });
                }
            }
        }
    }
    return coords.length > 0 ? coords : [{ name: 'TBA', phone: '', email: '' }];
}

const deptMap = new Map();
let deptId = 1;
const deptMeta = {
    'COMPUTER SCI. & ENGG.': { name: 'CS Cipher', icon: '💻', desc: 'Coding challenges, hackathons, robotics & gaming events' },
    'Literary': { name: 'Literary Sahitya Spectrum', icon: '📚', desc: 'Poetry, debates, declamation & panel discussions' },
    'Cultural': { name: 'Cultural Rangmanch', icon: '🎭', desc: 'Dance, music, comedy & fashion shows' },
    'FINE ARTS': { name: 'Fine Art Kalakriti', icon: '🎨', desc: 'Sketching, quilling, henna, comics & time-lapse videos' },
    'ASHOKA SCHOOL OF BUISNESS': { name: 'ASB Tarangan', icon: '💼', desc: 'Shark tank, reels, cooking & ad-making competitions' },
    'PHARMACY': { name: 'Pharma – The Saviours', icon: '💊', desc: 'Health camps, herbal shots, quizzes & expo' },
    'MANAGEMENT': { name: 'Management Ensemble', icon: '📊', desc: 'Business pitches, GD, poster gallery & edu-talks' },
    'MECHANICAL ENGINEERING': { name: 'ME Yantrika', icon: '⚙️', desc: 'Robotics, junk yard, CAD design & model exhibits' },
    'ELECTRONICS & COMM. ENGG': { name: 'ECE Digital Dusk', icon: '📡', desc: 'Robo race, circuit battles & project exhibitions' },
    'ELECTRICAL ENGINEERING': { name: 'EE Vidyutam', icon: '⚡', desc: 'Maze challenges, memory grids & circuit art' },
    'CIVIL ENGINEERING': { name: 'Civil Symposium', icon: '🏗️', desc: 'Paper towers, AutoCAD, quizzes & load bearing' },
    'Biotechnology': { name: 'BT Spark', icon: '🧬', desc: 'Lab experiments, games & fun science challenges' },
};

for (const ev of raw) {
    const dept = getDept(ev.description);
    if (!deptMap.has(dept)) {
        const meta = deptMeta[dept] || { name: dept, icon: '🎪', desc: `Events by ${dept}` };
        deptMap.set(dept, { id: String(deptId++), name: meta.name, image: meta.icon, description: meta.desc });
    }
}

const events = raw.map((ev, idx) => {
    const dept = getDept(ev.description);
    const deptData = deptMap.get(dept);
    const eventName = getField(ev.description, 'Event Name') || ev.title.replace(/\{.*\}/, '').trim();
    const date = getField(ev.description, 'Date') || '';
    let time = getField(ev.description, 'Time') || '';
    if (time.startsWith('- Venue') || time === '') time = 'TBA';
    const venue = ev.location_text || getField(ev.description, 'Venue') || '';
    const teamSize = getField(ev.description, 'Team Size') || 'TBA';
    const rules = getRules(ev.description);
    const coords = getCoordinators(ev.description);

    return {
        id: `ev${idx + 1}`, name: eventName, departmentId: deptData.id,
        description: eventName, rules, eligibility: 'All college students',
        teamSize, venue, date, time, prize: 'TBA', googleFormLink: GOOGLE_FORM,
        bannerImage: ev.image_url || '', coordinators: coords, status: 'active'
    };
});

const departments = Array.from(deptMap.values());

// Write as JSON files
fs.writeFileSync(
    path.join(__dirname, '..', 'src', 'data', 'departments.json'),
    JSON.stringify(departments, null, 2), 'utf8'
);
fs.writeFileSync(
    path.join(__dirname, '..', 'src', 'data', 'events.json'),
    JSON.stringify(events, null, 2), 'utf8'
);
console.log(`Done! ${departments.length} depts, ${events.length} events`);
console.log('Depts:', departments.map(d => d.name).join(', '));
