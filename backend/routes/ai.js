'use strict';

const express = require('express');
const router = express.Router();

// ─── BACKGROUND CONTEXT (RISHI'S PROFILE) ──────────────────────────────────────
const RISHI_PROFILE = {
  name: 'Rushikesh (Rishi) Sawarkar',
  location: 'Mumbai, India',
  email: 'rushikeshsawarkar14@gmail.com',
  phone: '+91 7972533946',
  experience_years: 3,
  education: 'Pursuing Computer Engineering at University of Technology',
  gdsc: 'Technical Team Member at Google Developer Student Clubs (GDSC) since Sep 2024, actively contributing to technical projects, cloud, and open-source events, building innovative solutions, and mentoring peers.',
  slashmark: 'Web Development Intern at Slash Mark IT Solutions (OPC) Pvt. Ltd (May 2024 - Jul 2024), where he built dynamic web applications using JavaScript, PHP, Node.js, and PhpMyAdmin, gaining hands-on full-stack experience.',
  helperyt: 'Educational Content Creator at Helper YT on YouTube since Nov 2022, creating instructional web development content and resources.',
  services: [
    { title: 'UI/UX Design', projectsCompleted: 7, desc: 'Creating clean, accessible, and high-fidelity user interfaces.' },
    { title: 'Web Design', projectsCompleted: 13, desc: 'Developing responsive, pixel-perfect, and modern websites.' },
    { title: 'Landing Page', projectsCompleted: 4, desc: 'Designing optimized, high-converting landing pages for businesses.' }
  ],
  projects: [
    {
      title: 'Energy Monitoring System',
      description: 'An IoT-based mobile application supporting smart meters with real-time insights into energy usage, enabling tracking and optimization.',
      tags: ['UI Design', 'Mobile App']
    },
    {
      title: 'Real-Estate Platform',
      description: 'A comprehensive platform connecting buyers, sellers, and agents with seamless property listings, virtual tours, and smart search filters.',
      tags: ['Design System', 'UI Components']
    },
    {
      title: 'Edtech Platform',
      description: 'An online educational hub offering interactive courses, live classes, skill development pathways, and personalized dashboards for students.',
      tags: ['Web App', 'Dashboard']
    }
  ]
};

// Crafting the system instruction prompt for Gemini
const SYSTEM_INSTRUCTION = `
You are "Rishi's Virtual AI Assistant," a smart, friendly, and helpful AI chatbot created by Rushikesh (Rishi) Sawarkar to assist visitors on his portfolio site.

RISHI'S BACKGROUND CONTEXT:
- Name: ${RISHI_PROFILE.name}
- Location: ${RISHI_PROFILE.location}
- Contact Email: ${RISHI_PROFILE.email} (Visitors can also use the contact form at the bottom of the page)
- Contact Phone: ${RISHI_PROFILE.phone}
- Experience: ${RISHI_PROFILE.experience_years} years of building web applications as a passionate full-stack developer.
- Education: ${RISHI_PROFILE.education}
- Roles:
  1. ${RISHI_PROFILE.gdsc}
  2. ${RISHI_PROFILE.slashmark}
  3. ${RISHI_PROFILE.helperyt}
- Services Offered:
  * UI/UX Design (${RISHI_PROFILE.services[0].projectsCompleted} projects completed)
  * Web Design (${RISHI_PROFILE.services[1].projectsCompleted} projects completed)
  * Landing Page Design (${RISHI_PROFILE.services[2].projectsCompleted} projects completed)
- Featured Projects:
  1. "${RISHI_PROFILE.projects[0].title}": ${RISHI_PROFILE.projects[0].description} (Tags: ${RISHI_PROFILE.projects[0].tags.join(', ')})
  2. "${RISHI_PROFILE.projects[1].title}": ${RISHI_PROFILE.projects[1].description} (Tags: ${RISHI_PROFILE.projects[1].tags.join(', ')})
  3. "${RISHI_PROFILE.projects[2].title}": ${RISHI_PROFILE.projects[2].description} (Tags: ${RISHI_PROFILE.projects[2].tags.join(', ')})

YOUR RESPONSE RULES:
1. Always respond in the third person when talking about Rishi (e.g., "Rishi is a full-stack developer...", "He worked at Slash Mark...").
2. Refer to yourself as his assistant ("I am Rishi's AI assistant...").
3. Be professional, warm, welcoming, and concise (keep answers under 2-3 sentences unless the user asks for in-depth details).
4. Guide users to other parts of the site when appropriate (e.g., "You can see these in the Projects section above" or "Feel free to drop him a message in the Get in Touch form below!").
5. Strictly do not hallucinate, make up details, or assume experience beyond what is documented in the context.
`;

// ─── INTELLIGENT RULE ENGINE (FALLBACK MODE) ──────────────────────────────────
function getFallbackResponse(userInput) {
  const query = userInput.toLowerCase();

  // Greeting
  if (/\b(hi|hello|hey|greetings|hola)\b/.test(query)) {
    return `Hello! I'm Rishi's AI Assistant. How can I help you today? I can tell you about his work experience, services, projects, or how to get in touch.`;
  }

  // GDSC
  if (/\b(gdsc|google developer|club|clubs)\b/.test(query)) {
    return `Rishi is a Technical Team Member at Google Developer Student Clubs (GDSC) since September 2024. In this role, he contributes to web, cloud, and open-source initiatives, helps build solutions, and mentors peers in technical domains.`;
  }

  // Intern / Slash Mark
  if (/\b(slash\s*mark|intern|internship|experience|work|job)\b/.test(query)) {
    return `Rishi has ${RISHI_PROFILE.experience_years} years of development experience. Most recently, he completed a Web Development Internship at Slash Mark IT Solutions (OPC) Pvt. Ltd (May - Jul 2024), where he developed dynamic web apps using JS, PHP, Node.js, and database systems.`;
  }

  // YouTube / Helper YT
  if (/\b(youtube|yt|helper|creator|content|channel|videos)\b/.test(query)) {
    return `Yes! Rishi is an Educational Content Creator on YouTube under the channel "Helper YT" since November 2022. He loves sharing coding tutorials, web technologies, and resources with fellow learners.`;
  }

  // Projects
  if (/\b(project|projects|portfolio|built|made|created)\b/.test(query)) {
    return `Rishi has built several awesome projects: 
1. **Energy Monitoring System** (IoT-based mobile app for real-time power tracking)
2. **Real-Estate Platform** (Property search and design system)
3. **Edtech Platform** (Interactive live-learning hub)
Would you like to know more about a specific one? You can also see them in the Projects section above.`;
  }

  // Services / Skills
  if (/\b(service|services|offer|skills|expert|languages|stack|ui|ux|web|design)\b/.test(query)) {
    return `Rishi specializes in Full-Stack Web Development and UI/UX Design. His services include:
- **UI/UX Design** (7 projects completed)
- **Web Design & Development** (13 projects completed)
- **Landing Page Design** (4 projects completed)
He works primarily with modern JavaScript, Node.js, Express, EJS, PHP, and modern CSS/Bootstrap.`;
  }

  // Contact
  if (/\b(contact|email|phone|call|hire|reach|touch|location|where)\b/.test(query)) {
    return `Rishi is based in Mumbai, India. You can reach out directly via email at **${RISHI_PROFILE.email}**, call him at **${RISHI_PROFILE.phone}**, or simply use the "Get in Touch" contact form located at the bottom of this page!`;
  }

  // About / Education
  if (/\b(about|who is|who are|education|college|university|degree|engineering)\b/.test(query)) {
    return `Rishi is a passionate Full-Stack Developer with ${RISHI_PROFILE.experience_years} years of web experience. He is currently pursuing a degree in Computer Engineering at University of Technology and loves building user-friendly digital products.`;
  }

  // Default response
  return `I'm Rishi's virtual AI assistant. Rishi is a Full-Stack Developer and UI/UX designer specializing in JavaScript, Node.js, and web technologies. Ask me about his GDSC role, Slash Mark internship, projects like the Energy Monitoring System, or how to contact him!`;
}

// ─── POST /ai/chat ─────────────────────────────────────────────────────────────
router.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ success: false, error: 'Message content is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Fallback: If no Gemini API key is configured, use the smart rule engine
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    const reply = getFallbackResponse(message);
    // Simulate a brief, natural delay for authentic feeling
    await new Promise(resolve => setTimeout(resolve, 800));
    return res.json({ success: true, reply, source: 'fallback' });
  }

  try {
    // Calling Gemini 2.5 Flash endpoint using standard HTTPS POST
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: message.trim() }]
        }
      ],
      systemInstruction: {
        parts: [{ text: `${SYSTEM_INSTRUCTION}\n- CURRENT DATE: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` }]
      },
      generationConfig: {
        maxOutputTokens: 350,
        temperature: 0.7
      }
    };

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('Gemini API returned error status:', response.status, errorText);
      // Fail over to fallback engine instead of crashing
      const reply = getFallbackResponse(message);
      return res.json({ success: true, reply, source: 'fallback-after-error' });
    }

    const data = await response.json();
    let reply = '';

    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      reply = data.candidates[0].content.parts[0].text.trim();
    } else {
      reply = getFallbackResponse(message);
    }

    return res.json({ success: true, reply, source: 'gemini' });

  } catch (err) {
    console.error('Error contacting Gemini API:', err.message);
    // Graceful fallback on network exception
    const reply = getFallbackResponse(message);
    return res.json({ success: true, reply, source: 'fallback-after-exception' });
  }
});

module.exports = router;
