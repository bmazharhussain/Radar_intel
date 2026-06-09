/* ═══════════════════════════════════════════════════════════════════
   RADAR COACH ENGINE — PHASE 1 (LOCAL RULE-BASED)
   ─────────────────────────────────────────────────────────────────
   SWAP INSTRUCTIONS: Replace getCoachResponse() with Claude API call.
   Input:  userMessage (string), profileContext (object)
   Output: { type, message, suggestions[], radarLink, diagnostic }
═══════════════════════════════════════════════════════════════════ */

const COACH_SCENARIOS = [
{ id: 1, category: "Promotion and salary negotiation", triggers: ["promotion", "promoted", "next level", "ready for promotion", "how do I get promoted", "promotion conversation", "career progression"], diagnostic: null, response: "Before you ask for a promotion, separate performance from readiness. Strong performance in your current role is the entry ticket; promotion is about proving you are already operating at the next level. Build a one-page promotion case with three sections: outcomes delivered, scope already expanded, and evidence that others rely on your judgment. Include specific examples: projects led, decisions made without escalation, stakeholders influenced, people coached, revenue protected, risks reduced, or processes improved. Then compare your evidence against the next-level expectations, not just your current job description. In the meeting, avoid opening with 'I think I deserve a promotion.' Say: 'I'd like to discuss my progression to the next level. I've pulled together evidence of where I'm already operating at that level, and I'd like your view on what gaps remain.' That framing makes the conversation practical rather than emotional. Ask your manager to name the exact promotion criteria, who else influences the decision, and what timeline is realistic. If they support you, agree the next three proof points you need to create. If they hesitate, ask: 'What would need to be true for you to confidently advocate for me in the next promotion cycle?' After the meeting, send a short written summary so the criteria cannot drift later.", suggestions: ["How do I know if I'm really ready for promotion?", "What should I say in the promotion meeting?", "What if my manager says there is no budget or headcount?"], radarLink: { label: "Explore Program Management career ladder", path: "program_management" } },
{ id: 2, category: "Promotion and salary negotiation", triggers: ["pay rise", "salary increase", "raise", "more money", "increase my salary", "ask for a raise", "salary review"], diagnostic: null, response: "Treat a salary increase as a business case, not a personal request. Before the conversation, collect three kinds of evidence: internal value, external market data, and expanded responsibility. Internal value means measurable outcomes: cost savings, revenue contribution, customer impact, delivery improvements, reduced risk, faster cycle times, or improved team performance. External market data means looking at credible salary ranges for your role, location, industry, and seniority. Expanded responsibility means showing where your role has grown beyond what your current compensation reflects. When you speak to your manager, use calm commercial language: 'I'd like to discuss whether my compensation still reflects the scope and impact of my role.' Then present the evidence briefly. Do not over-explain your personal financial needs. Give a range, not a single number, and anchor it in market evidence. If the answer is no, ask: 'What is the process for reviewing this formally, who needs to approve it, and when can we revisit it?'", suggestions: ["How much of a raise should I ask for?", "How do I respond if they say salaries are frozen?", "Should I mention another job offer?"], radarLink: { label: "Explore Business Operations career ladder", path: "operations_supply_chain" } },
{ id: 3, category: "Promotion and salary negotiation", triggers: ["underpaid", "paid less than market", "market rate", "salary benchmark", "below market", "not paid enough", "others earn more than me"], diagnostic: null, response: "If you suspect you are underpaid, do not start with frustration — start with verification. First, triangulate market data from at least three sources: salary surveys, recruiter conversations, job adverts with listed ranges, and trusted peers in comparable roles. Adjust for location, company size, industry, seniority, and total compensation. Once you have that evidence, prepare a concise compensation review request. The strongest wording is: 'Based on the current scope of my role and market data for comparable positions, I believe my compensation is below range. I'd like to discuss how we can correct that.' Bring numbers, but do not make the conversation only about numbers. Set a decision date. If they cannot correct the gap within a defined period, you should quietly test the external market while continuing to perform professionally.", suggestions: ["How do I find reliable salary data?", "What if I discover a colleague earns more than me?", "Should I leave if they won't correct my salary?"], radarLink: { label: "Explore Data Analytics career ladder", path: "data_analytics" } },
{ id: 4, category: "Promotion and salary negotiation", triggers: ["promotion delayed", "keep being told next year", "promotion keeps getting pushed", "waiting for promotion", "promised promotion", "promotion not happening", "delayed progression"], diagnostic: null, response: "A delayed promotion needs to be converted from a vague promise into a managed decision process. Start by requesting a dedicated progression meeting. Ask four direct questions: what criteria have I already met, what criteria remain unmet, who is involved in the decision, and which promotion cycle are we targeting? If the answer is still vague, press politely: 'I understand things can change, but I need a concrete plan so I can make informed career decisions.' Ask for milestones over the next 8 to 12 weeks, not a distant promise for next year. After the meeting, send a written recap with the agreed criteria and timeline. If your manager avoids putting anything in writing, that is a signal. Give the process one more clear cycle. If the goalposts move again without a credible reason, begin exploring external opportunities.", suggestions: ["How do I push without sounding impatient?", "What if the promotion was verbally promised?", "When should I stop waiting and look elsewhere?"], radarLink: { label: "Explore Product Management career ladder", path: "product_management" } },
{
    id: 5,
    category: "Promotion and salary negotiation",
    triggers: ["doing senior work", "acting above my level", "higher responsibilities", "doing manager work", "working above my pay grade", "more responsibility no promotion", "senior responsibilities"],
    diagnostic: null,
    response: "One of the most common career traps is quietly accepting next-level responsibilities without securing next-level recognition. Companies rarely increase someone's title simply because they have been helpful. If you are leading projects, mentoring colleagues, making decisions normally reserved for a more senior role, or acting as the escalation point for others, document that evidence. Create a comparison table showing your official responsibilities versus the responsibilities you actually perform. Then schedule a career progression conversation. Say: 'The scope of my role has evolved significantly, and I'd like to discuss whether my title and level still reflect the work being performed.' Avoid sounding resentful. Demonstrate that the organisation is already receiving the value of a higher-level employee. Ask whether your current responsibilities align with the next career level. If yes, discuss timing and process. If no, ask precisely what differentiates the higher level and what evidence would close the gap.",
    suggestions: ["How long should I do senior work before asking for promotion?", "What evidence carries the most weight?", "What if they say it's part of my development?"],
    radarLink: { label: "Explore Program Management career ladder", path: "program_management" }
  },

  {
    id: 6,
    category: "Promotion and salary negotiation",
    triggers: ["internal promotion or leave", "stay or leave", "promotion elsewhere", "external offer", "internal progression", "better opportunities outside", "career growth"],
    diagnostic: null,
    response: "If you're deciding between waiting for an internal promotion and pursuing external opportunities, evaluate velocity, visibility, and opportunity. Velocity means how quickly people actually get promoted in your organisation. Visibility means whether decision-makers know your work well enough to advocate for you. Opportunity means whether a higher-level role genuinely exists. Compare that with the external market. If another company would hire you immediately at the next level, that is valuable data. Ask yourself: if I joined this company today with my current experience, would they hire me into a higher-level role than the one I currently occupy? If the answer is yes, your progression may be lagging behind your capability. Make decisions based on evidence, not loyalty alone.",
    suggestions: ["How long should I wait for an internal promotion?", "Should I tell my manager I'm exploring options?", "How do I compare opportunities objectively?"],
    radarLink: { label: "Explore Product Management career ladder", path: "product_management" }
  },

  {
    id: 7,
    category: "Promotion and salary negotiation",
    triggers: ["counter offer", "counteroffer", "company matched offer", "should i accept counter offer", "retention offer", "new job offer", "leaving company"],
    diagnostic: null,
    response: "Counter-offers are emotionally attractive because they appear to solve the immediate problem. Before accepting one, write down the real reasons you started looking elsewhere. Lack of growth, poor leadership, burnout, lack of recognition, or limited career opportunities are rarely fixed by money alone. Evaluate the new role as if the counter-offer did not exist. Which opportunity would you choose? Which manager would you rather work for? Which environment creates stronger long-term growth? If you accept a counter-offer, ensure it includes more than compensation. Clarify future progression, responsibilities, and expectations. A counter-offer without structural improvements often delays rather than solves the underlying issue.",
    suggestions: ["Why do companies make counter-offers?", "How often do people regret accepting them?", "What questions should I ask before deciding?"],
    radarLink: null
  },

  {
    id: 8,
    category: "Promotion and salary negotiation",
    triggers: ["salary negotiation job offer", "negotiating offer", "job offer salary", "offer negotiation", "new role compensation", "salary package"],
    diagnostic: null,
    response: "The strongest salary negotiations happen before you accept the offer, not after you join. Research the market range, understand the value of the role, and decide your target, acceptable, and walk-away numbers before discussions begin. When the offer arrives, avoid responding immediately. Thank them, express enthusiasm, and ask for time to review. Then negotiate professionally: 'I'm excited about the opportunity. Based on my experience and market benchmarks, I was expecting something closer to X.' If salary flexibility is limited, explore signing bonuses, additional leave, professional development budgets, remote work flexibility, equity, or accelerated review periods. Negotiation is not confrontation. Companies expect experienced candidates to discuss compensation. The goal is to reach a package that reflects the value you bring without damaging the relationship before you even start.",
    suggestions: ["How much should I negotiate?", "What if they withdraw the offer?", "Should I reveal my current salary?"],
    radarLink: null
  },

  {
    id: 9,
    category: "Promotion and salary negotiation",
    triggers: ["promotion denied", "didn't get promoted", "missed promotion", "promotion rejected", "promotion unsuccessful", "not promoted"],
    diagnostic: null,
    response: "A denied promotion is disappointing, but the next conversation matters more than the decision itself. Most people leave with vague feedback like 'keep doing what you're doing.' That is not actionable. Ask specifically: Which promotion criteria did I meet? Which did I not meet? What evidence would demonstrate readiness? Who was involved in the decision? What timeline should I realistically target? Take detailed notes. Then build a development plan around the gaps identified. If the feedback is inconsistent or constantly changing, that is a separate issue. Promotions should be based on transparent criteria, not shifting expectations. Use the denial as a data-gathering exercise. Within six months you should either have a credible path forward or enough information to decide whether your growth is being constrained.",
    suggestions: ["How do I recover motivation after being rejected?", "Should I challenge the decision?", "When should I consider leaving?"],
    radarLink: { label: "Explore Software Engineering career ladder", path: "software_engineering" }
  },

  {
    id: 10,
    category: "Promotion and salary negotiation",
    triggers: ["more work no extra pay", "expanded responsibilities", "scope increased", "extra duties", "taking on more work", "not compensated"],
    diagnostic: null,
    response: "When your scope expands without additional compensation, first determine whether the change is temporary or permanent. Temporary stretch assignments can be valuable development opportunities. Permanent expansion is different. Document exactly what has changed: team size, budgets, projects, stakeholders, decision-making authority, or operational responsibility. Then quantify the difference. Instead of saying 'I'm doing more work,' explain how the role has fundamentally changed. Request a discussion focused on role alignment rather than dissatisfaction. Say: 'Over the last year my responsibilities have expanded significantly. I'd like to review whether my level and compensation still reflect the scope of the role.' If the organisation expects ongoing delivery at the higher level, there should be a clear conversation about recognition, title, compensation, or progression. Do not allow expanded expectations to become permanent through silence.",
    suggestions: ["How do I prove my role has changed?", "Should I stop taking on extra work?", "What if they acknowledge it but do nothing?"],
    radarLink: { label: "Explore Program Management career ladder", path: "program_management" }
  }
,
{
    id: 16,
    category: "Handling a difficult manager or colleague",
    triggers: ["manager undermines me", "boss undermines me", "manager sabotaging me", "manager making me look bad", "manager against me", "undermining manager"],
    diagnostic: {
      questions: [
        { text: "Where is the undermining happening most often?", options: ["In meetings", "In front of senior leaders", "In performance discussions", "Behind my back"] },
        { text: "How frequently does it happen?", options: ["Occasionally", "Monthly", "Weekly", "Almost every interaction"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "In meetings": "When undermining happens in meetings, your goal is to correct the record without creating a public argument. Start documenting your contributions before meetings through written updates, agendas, or stakeholder emails. During discussions, calmly reference your work: 'To build on the analysis I shared last week...' or 'As discussed in the proposal I circulated...' This keeps ownership visible. After repeated incidents, schedule a private conversation. Focus on observable behaviour rather than intent. Say: 'I've noticed several situations where my recommendations were dismissed publicly without discussion. I'd like to understand how we can present a more consistent message.'",
      "In front of senior leaders": "This is particularly damaging because it affects reputation and progression. Build direct credibility with senior stakeholders through regular updates, project reviews, and visible ownership of outcomes. Ensure your work is associated with your name before major meetings. If your manager consistently misrepresents your contribution, document examples with dates and context. The issue is no longer communication—it becomes a career risk that requires evidence and escalation if unresolved.",
      "In performance discussions": "Ask for specific examples whenever criticism appears. Vague concerns cannot be improved. If your manager claims there are performance issues, request evidence, expectations, and success measures. Follow up every discussion in writing. A paper trail protects both clarity and fairness.",
      "Behind my back": "Indirect undermining is difficult because you rarely see it happen. Look for patterns: projects being reassigned, opportunities disappearing, stakeholder behaviour changing unexpectedly. Strengthen relationships across the organisation so your reputation is not dependent on a single person. Independent credibility reduces vulnerability."
    },
    suggestions: ["How do I document incidents properly?", "When should I escalate to HR?", "How do I protect my reputation?"],
    radarLink: null
  },

  {
    id: 17,
    category: "Handling a difficult manager or colleague",
    triggers: ["poor communication manager", "manager doesn't communicate", "boss never responds", "unclear manager", "lack of direction", "manager hard to reach"],
    diagnostic: {
      questions: [
        { text: "What communication issue causes the most problems?", options: ["No feedback", "Slow responses", "Changing priorities", "Unclear expectations"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "No feedback": "Stop asking broad questions like 'Any feedback?' Ask specific questions tied to actual work. For example: 'What's the biggest improvement I could make on this project?' Managers often respond better to targeted requests.",
      "Slow responses": "Reduce dependency. Present recommendations rather than questions. Instead of asking what to do next, propose an option and ask for approval. This shortens decision cycles and reduces waiting.",
      "Changing priorities": "Maintain a written priority list. Whenever priorities change, confirm the trade-offs: 'To make room for this new request, which existing task should move down?' This creates clarity and accountability.",
      "Unclear expectations": "Convert verbal conversations into written summaries. After meetings, send a short recap outlining deliverables, timelines, and decisions. This prevents confusion later."
    },
    suggestions: ["How can I manage up more effectively?", "What if my manager never responds?", "How do I get clearer expectations?"],
    radarLink: null
  },

  {
    id: 18,
    category: "Handling a difficult manager or colleague",
    triggers: ["toxic colleague", "negative coworker", "difficult coworker", "toxic teammate", "coworker causing problems", "team toxicity"],
    diagnostic: {
      questions: [
        { text: "What behaviour is causing the biggest issue?", options: ["Constant negativity", "Gossiping", "Aggressive behaviour", "Refuses to collaborate"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "Constant negativity": "Do not become their emotional dumping ground. Redirect conversations toward solutions. If every discussion becomes a complaint session, ask: 'What outcome are you hoping for?' This shifts focus from frustration to action.",
      "Gossiping": "Never contribute additional information. Stay neutral and professional. People who gossip to you usually gossip about you. Build a reputation for discretion.",
      "Aggressive behaviour": "Address specific incidents immediately and professionally. Focus on observable actions rather than personality. If behaviour crosses professional boundaries, document it and involve management.",
      "Refuses to collaborate": "Reduce ambiguity. Clarify responsibilities, deadlines, and ownership in writing. Escalate only after demonstrating reasonable efforts to work together."
    },
    suggestions: ["How do I stay professional?", "When should I involve my manager?", "Can a toxic colleague damage my career?"],
    radarLink: null
  },

  {
    id: 19,
    category: "Handling a difficult manager or colleague",
    triggers: ["colleague blocking me", "coworker blocking progress", "can't get support", "stakeholder blocking project", "someone blocking my work", "roadblock colleague"],
    diagnostic: {
      questions: [
        { text: "Why are they blocking progress?", options: ["Different priorities", "Protecting territory", "Lack of trust", "Unknown reason"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "Different priorities": "Assume misalignment before malice. Understand what success looks like from their perspective. Many conflicts disappear once priorities are visible.",
      "Protecting territory": "Territorial behaviour often comes from perceived threats. Frame requests around shared outcomes rather than ownership. Show how collaboration benefits them.",
      "Lack of trust": "Trust is earned through reliability and transparency. Deliver small commitments consistently before seeking support on larger initiatives.",
      "Unknown reason": "Schedule a direct conversation. Ask open questions about concerns, risks, and competing priorities. Lack of information often creates unnecessary assumptions."
    },
    suggestions: ["How do I influence without authority?", "Should I escalate?", "How do I handle territorial people?"],
    radarLink: null
  },

  {
    id: 20,
    category: "Handling a difficult manager or colleague",
    triggers: ["difficult stakeholder", "stakeholder conflict", "hard stakeholder", "stakeholder won't cooperate", "challenging stakeholder", "stakeholder issues"],
    diagnostic: {
      questions: [
        { text: "What makes the stakeholder difficult?", options: ["Always changes requirements", "Never available", "Challenges everything", "Has unrealistic expectations"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "Always changes requirements": "Introduce change control. Document requirements, decisions, and impacts. Every new request should have a visible cost in time, scope, or resources.",
      "Never available": "Create shorter, easier decision points. Instead of asking for broad input, ask for approval on specific options with deadlines.",
      "Challenges everything": "Separate useful challenge from obstruction. Ask them to explain concerns and propose alternatives. Often criticism becomes constructive when responsibility is shared.",
      "Has unrealistic expectations": "Reset expectations with evidence. Show timelines, resource constraints, dependencies, and trade-offs. Unrealistic expectations survive when reality remains invisible."
    },
    suggestions: ["How do I build stakeholder trust?", "What if they outrank me?", "How do I push back professionally?"],
    radarLink: null
  }
,
{
  id: 30,
  category: "Career transition advice",
  triggers: ["return to old profession", "go back to previous career", "return to previous industry", "former profession"],
  diagnostic: null,
  response: "Returning to a previous profession requires a stronger narrative than simply saying you changed your mind. Employers will want to understand why you left, what you learned while away, and why returning makes sense now. Build a timeline of your career and identify the skills, perspectives, and relationships gained outside the profession. Then position your return as an advantage. For example, someone returning to finance after working in operations can explain how they now understand commercial execution, not just reporting. Refresh technical knowledge before applying and reconnect with former colleagues who can validate your credibility. The most successful returners present themselves as experienced professionals bringing additional perspective, not as people trying to undo a mistake.",
  suggestions: ["How do I explain why I left?", "How do I rebuild credibility quickly?", "Should I reconnect with old employers?"],
  radarLink: null
},
{
  id: 31,
  category: "Career transition advice",
  triggers: ["leave corporate for startup", "startup career", "join startup", "move to startup", "corporate to startup"],
  diagnostic: null,
  response: "The biggest mistake corporate professionals make when joining startups is assuming the same support systems will exist. In a startup, processes are often incomplete, responsibilities overlap, and ambiguity is constant. Before making the move, assess your tolerance for uncertainty. Ask about funding runway, decision-making structure, customer traction, and leadership experience. During interviews, focus less on the title and more on influence, ownership, and learning opportunities. A strong startup role often accelerates growth because you are exposed to decisions and responsibilities that would take years to access in a larger organisation. However, only make the move if you are comfortable solving problems without a playbook.",
  suggestions: ["How do I evaluate startup risk?", "Should I take equity over salary?", "What questions should I ask founders?"],
  radarLink: { label: "Explore Product Management career ladder", path: "product_management" }
},
{
  id: 32,
  category: "Career transition advice",
  triggers: ["startup to corporate", "leave startup", "join large company", "move to corporate", "corporate career"],
  diagnostic: null,
  response: "Moving from a startup into a larger organisation requires translating your experience into language corporate employers understand. Startups often demand broad responsibility, but large companies hire for defined scope. Instead of saying you 'did everything', explain specific outcomes: built processes, scaled operations, managed stakeholders, launched products, or improved performance. Show that you can operate within governance, structure, and cross-functional environments. Large organisations value people who bring entrepreneurial thinking while still respecting process and risk management.",
  suggestions: ["How do I explain startup experience?", "Will corporate employers value it?", "How should I position my CV?"],
  radarLink: null
},
{
  id: 33,
  category: "Career transition advice",
  triggers: ["become consultant", "move into consulting", "consulting career", "management consulting", "independent consultant"],
  diagnostic: null,
  response: "Consulting is often misunderstood as simply giving advice. In reality, clients pay consultants to reduce uncertainty, accelerate decisions, and deliver outcomes. Before transitioning, assess whether you have expertise that organisations would willingly pay for. Build a portfolio of evidence demonstrating measurable impact. If moving into a consulting firm, develop structured problem-solving, executive communication, and stakeholder management skills. If becoming independent, focus equally on business development. The ability to win work is just as important as the ability to deliver it.",
  suggestions: ["How do I find consulting clients?", "Should I join a firm first?", "What skills matter most in consulting?"],
  radarLink: null
},
{
  id: 34,
  category: "Career transition advice",
  triggers: ["move into product management", "become product manager", "product management career", "transition to product"],
  diagnostic: null,
  response: "Most successful transitions into product management come from adjacent roles such as engineering, design, project management, operations, or customer-facing functions. Start by developing product thinking. Learn how customer problems are identified, prioritised, validated, and translated into outcomes. Volunteer for cross-functional initiatives where you can work with product teams. Build evidence of decision-making, stakeholder alignment, roadmap influence, and customer understanding. Hiring managers rarely expect first-time product managers to have done the role before, but they do expect evidence that you think like a product manager.",
  suggestions: ["How do I get product experience?", "What should I learn first?", "Do I need a product certification?"],
  radarLink: { label: "Explore Product Management career ladder", path: "product_management" }
},
{
  id: 35,
  category: "Career transition advice",
  triggers: ["portfolio career", "multiple careers", "multiple income streams", "freelance and job", "side career"],
  diagnostic: null,
  response: "A portfolio career can provide resilience, variety, and autonomy, but it requires deliberate planning. Start by identifying which skills are commercially valuable across different contexts. Then build one additional income stream before attempting several. Many people fail because they diversify too quickly. Establish systems for time management, client communication, and financial tracking. Think of yourself as managing a collection of professional assets rather than a single job. The goal is not simply to work more. It is to create flexibility and reduce dependence on a single employer or income source.",
  suggestions: ["What side income should I start with?", "How do I manage multiple commitments?", "How do I avoid burnout?"],
  radarLink: null
},
{
  id: 36,
  category: "Career transition advice",
  triggers: ["don't know what career", "unsure career path", "what should i do", "career confusion", "lost in career"],
  diagnostic: null,
  response: "Career clarity rarely appears through thinking alone. It comes from structured experimentation. Start by analysing your past experiences. Which activities gave you energy? Which problems did you enjoy solving? Which environments brought out your best work? Then test options through conversations, shadowing, short projects, courses, or volunteering. Avoid making major decisions based purely on online research. Real-world exposure creates much better information. Instead of asking 'What is the perfect career?', ask 'What is the next experiment that will teach me something useful?' Progress comes from evidence, not speculation.",
  suggestions: ["How do I identify my strengths?", "What career assessments are useful?", "How do I test options safely?"],
  radarLink: null
},
{
  id: 37,
  category: "Skill gap identification",
  triggers: ["what skill should i learn", "next skill to learn", "future skills", "career development skills", "skill gap"],
  diagnostic: null,
  response: "Most people choose skills based on interest. High performers choose skills based on leverage. Start by identifying the next role you want, not the next course you want to take. Then examine job descriptions, promotion criteria, and high performers in that field. Look for recurring themes. The best skill to learn is usually the one that removes the biggest constraint on your career progression. For some people that is communication. For others it is technical depth, commercial awareness, leadership, or data literacy. Prioritise skills that increase opportunities across multiple roles rather than narrowly specialised knowledge unless you are pursuing a specialist path.",
  suggestions: ["How do I identify high-leverage skills?", "Should I specialise or generalise?", "How do I learn faster?"],
  radarLink: null
},
{
  id: 38,
  category: "Skill gap identification",
  triggers: ["skills for promotion", "promotion skills", "what am i missing", "promotion gap", "ready for next level"],
  diagnostic: null,
  response: "When people miss promotions, the gap is often not effort but visibility of the right capabilities. Compare your current role with the next level and identify differences in scope, influence, decision-making, and leadership. Ask respected senior colleagues what distinguishes strong performers at that level. Then create evidence rather than waiting for opportunities. Volunteer for cross-functional work, strategic initiatives, stakeholder presentations, or mentoring responsibilities. Promotions usually require proof that you can already perform at the higher level.",
  suggestions: ["How do I identify promotion gaps?", "What evidence matters most?", "Who should I ask for feedback?"],
  radarLink: { label: "Explore Program Management career ladder", path: "program_management" }
},
{
  id: 39,
  category: "Skill gap identification",
  triggers: ["leadership skills", "become better leader", "leadership development", "future manager", "leadership gap"],
  diagnostic: null,
  response: "Leadership development begins long before you manage people. Start by building influence. Can you align stakeholders, resolve conflicts, make decisions under uncertainty, and help others succeed? Seek opportunities to lead projects, mentor colleagues, and facilitate discussions. After each experience, reflect on what worked and what didn't. Leadership is not a personality trait. It is a collection of behaviours that improve team outcomes. Focus on listening, clarity, accountability, and trust-building before worrying about authority.",
  suggestions: ["How do I gain leadership experience?", "What leadership skills matter most?", "Can leadership be learned?"],
  radarLink: { label: "Explore Program Management career ladder", path: "program_management" }
},
{
  id: 40,
  category: "Skill gap identification",
  triggers: ["communication skills", "better communicator", "present better", "executive communication", "communication gap"],
  diagnostic: null,
  response: "Communication is one of the highest-return career skills because it amplifies every other capability. Start by observing where communication breaks down. Are your messages unclear, too detailed, too vague, or poorly structured? Practice summarising complex topics in three levels: a one-sentence summary, a one-minute explanation, and a detailed discussion. Seek feedback after presentations and meetings. Strong communicators do not simply speak well. They help others understand, decide, and act. That is why communication often becomes a differentiator at senior levels.",
  suggestions: ["How do I improve executive communication?", "How can I present with confidence?", "What communication mistakes should I avoid?"],
  radarLink: null
}
,
{
    id: 51,
    category: "Job search and interview preparation",
    triggers: ["behavioral interview", "competency interview", "tell me about a time", "STAR interview", "behavioural questions", "interview examples"],
    diagnostic: null,
    response: "Behavioural interviews are designed to test whether your past behaviour predicts future performance. Do not prepare by memorising dozens of disconnected stories. Build a small evidence bank instead. Choose 6 to 8 strong examples that show leadership, problem solving, conflict resolution, stakeholder management, resilience, delivery under pressure, and learning from mistakes. For each example, write it in STAR format: Situation, Task, Action, Result. The most important section is Action. Interviewers want to know what you personally did, not what the team collectively achieved. Quantify the result where possible, but also explain the decision-making behind your actions. A strong answer should show judgement, not just activity. Avoid examples where you appear passive or where the resolution happened because someone else stepped in. Practise your answers aloud until they sound natural rather than scripted. If asked a question you did not prepare for, pause and choose the closest relevant example. The goal is not to deliver a perfect speech; it is to show evidence of how you operate when the work becomes difficult.",
    suggestions: ["How many interview examples should I prepare?", "How do I use the STAR method properly?", "What if I cannot think of a good example?"],
    radarLink: null
  },
  {
    id: 52,
    category: "Job search and interview preparation",
    triggers: ["technical interview", "coding interview", "case study interview", "technical assessment", "skills test", "take home task"],
    diagnostic: null,
    response: "Technical interviews test more than technical knowledge. They assess how you think, communicate, handle ambiguity, and respond under pressure. Before the interview, clarify the format: live problem solving, case study, system design, portfolio review, coding exercise, technical presentation, or take-home task. Prepare differently for each. For live problem solving, practise explaining your assumptions before jumping into an answer. For case studies, structure the problem before solving it. For take-home tasks, prioritise clarity, documentation, and trade-offs rather than trying to overbuild. During the interview, narrate your reasoning. A technically correct answer with no explanation can be less impressive than a slightly imperfect answer with clear thinking. If you get stuck, say what you know, what you are testing, and what you would do next. Senior candidates are often judged on judgement and trade-off awareness, not just execution. After the interview, write down the questions you struggled with and use them to refine your preparation. Technical interviewing improves fastest when you treat each interview as feedback data rather than a pass-fail verdict on your ability.",
    suggestions: ["How do I prepare for a technical assessment?", "What should I do if I get stuck?", "How much should I explain during a technical interview?"],
    radarLink: { label: "Explore Software Engineering career ladder", path: "software_engineering" }
  },
  {
    id: 53,
    category: "Job search and interview preparation",
    triggers: ["executive interview", "senior interview", "director interview", "leadership interview", "final executive round", "interview with ceo"],
    diagnostic: null,
    response: "Executive interviews are not only testing whether you can do the job. They are testing whether you can be trusted with judgement, ambiguity, people, and business consequences. Prepare at three levels: strategic context, leadership evidence, and commercial impact. Understand the organisation's market position, current pressures, competitors, and likely priorities. Then prepare examples that show how you have made decisions with incomplete information, influenced senior stakeholders, handled difficult trade-offs, and delivered outcomes through others. Avoid giving overly operational answers unless asked. Senior interviewers want to understand how you think, where you focus attention, and how you create leverage. When answering, connect your experience to business outcomes: revenue, margin, risk, customer trust, operating efficiency, retention, or strategic execution. Ask stronger questions than ordinary candidates: 'What are the most important outcomes this role must deliver in the first year?' or 'Where has this function struggled to create the impact the business needs?' Executive presence is not about sounding impressive. It is about being clear, commercially aware, composed, and useful in high-stakes conversations.",
    suggestions: ["How do I show executive presence?", "What questions should I ask senior leaders?", "How do I avoid sounding too operational?"],
    radarLink: null
  },
  {
    id: 54,
    category: "Job search and interview preparation",
    triggers: ["career story", "tell me about yourself", "explain my career path", "career narrative", "interview introduction", "walk me through your cv"],
    diagnostic: null,
    response: "Your career story should not be a chronological reading of your CV. It should explain the pattern behind your experience and why the next role makes sense. Use a simple structure: where you started, what you became known for, what you have delivered, and why this opportunity is the logical next step. Keep it focused on professional relevance. For example: 'I began in operations, where I developed a strong understanding of process and delivery. Over time I moved into cross-functional project work, leading initiatives that improved efficiency and stakeholder alignment. I'm now looking for a role where I can apply that experience at greater scale.' The best career stories make the interviewer feel that your background has direction, even if it was not perfectly linear. If you have changed industries, had gaps, or moved roles frequently, address the pattern calmly and connect it to learning. Do not apologise for your path. Explain it. A strong narrative turns varied experience into evidence of adaptability, judgement, and progression.",
    suggestions: ["How long should my answer be?", "How do I explain a non-linear career?", "What should I avoid when introducing myself?"],
    radarLink: null
  },
  {
    id: 55,
    category: "Job search and interview preparation",
    triggers: ["salary expectations", "expected salary", "what salary do you want", "compensation expectations", "desired salary", "salary question"],
    diagnostic: null,
    response: "The salary expectation question should be handled with preparation, not improvisation. Before interviews, define three numbers: your ideal number, your acceptable number, and your walk-away number. Research the market using role level, location, company size, industry, and total compensation, not just base salary. When asked early in the process, avoid locking yourself into a low figure before you understand the role. A strong response is: 'I'm flexible depending on the full scope and package, but based on similar roles in the market, I would expect something in the range of X to Y.' Give a range where the lower end is still acceptable. Do not base your answer solely on your current salary; your current compensation may reflect past negotiation, not market value. If they push for a single number, anchor it to evidence: 'Given the responsibilities we've discussed and my experience, I would be targeting X.' Keep the tone calm and commercial. Salary discussions are normal business conversations, not personal confrontations.",
    suggestions: ["Should I give a salary range?", "What if they ask my current salary?", "How do I avoid pricing myself too low?"],
    radarLink: null
  },
  {
    id: 56,
    category: "Job search and interview preparation",
    triggers: ["job hopping", "too many jobs", "short stays on cv", "explain job changes", "frequent job moves", "left jobs quickly"],
    diagnostic: null,
    response: "Frequent job moves need to be explained as a coherent pattern, not defended one by one. Employers worry about risk: will you leave quickly, struggle with commitment, or repeat the same pattern? Your answer should reduce that concern. Start by grouping the moves into a clear narrative. Perhaps you were building breadth, responding to restructures, relocating, pursuing growth, or moving from contract to permanent work. Then explain what you learned and what you are looking for now. A strong version sounds like: 'Earlier in my career, I made several moves while clarifying the environment where I do my best work. What I've learned is that I perform strongest in roles with ownership, clear outcomes, and room to build. That's why this opportunity appeals to me.' Avoid blaming former employers, even when they were part of the issue. Show maturity, self-awareness, and intention. If one move was clearly a mistake, say so briefly and explain what it taught you. Hiring managers are usually forgiving when they see reflection and stability in your current direction.",
    suggestions: ["How do I explain short roles?", "Should I remove jobs from my CV?", "How do I reassure employers I will stay?"],
    radarLink: null
  },
  {
    id: 57,
    category: "Job search and interview preparation",
    triggers: ["explain termination", "fired from job", "dismissed from role", "let go for performance", "terminated employment", "why were you fired"],
    diagnostic: null,
    response: "Explaining termination requires honesty, brevity, and evidence of learning. Do not over-explain, blame, or become defensive. Employers are listening for maturity. Prepare a short answer that acknowledges the situation, gives limited context, and moves quickly to what changed afterward. For example: 'The role was not a strong fit for my strengths, and ultimately the company decided to end the employment. Since then, I've reflected carefully on the environment where I perform best and have focused on roles where expectations, structure, and success measures are clearer.' If the termination involved a genuine mistake, take appropriate accountability: 'I would handle that situation differently now.' Then show what you have done since: training, improved systems, better communication, references from other roles, or stronger role selection. Never lie, but do not volunteer unnecessary detail. A termination is one event in a career, not your entire professional identity. The interviewer needs reassurance that the issue is understood, contained, and unlikely to repeat.",
    suggestions: ["Should I disclose being fired?", "How much detail should I give?", "What if they ask for references?"],
    radarLink: null
  },
  {
    id: 58,
    category: "Job search and interview preparation",
    triggers: ["final round interview", "last interview", "final interview", "offer stage", "meet the team interview", "interview with leadership"],
    diagnostic: null,
    response: "A final-round interview is usually less about basic competence and more about fit, risk, motivation, and confidence. At this stage, assume they already believe you can do the job. Your task is to help them feel safe choosing you. Revisit the role requirements and prepare evidence for the biggest concerns they may still have. If the role is senior, they may be testing judgement. If the team has had turnover, they may be testing commitment. If the role is cross-functional, they may be testing influence. Prepare a concise closing statement: why you are interested, what value you bring, and what you would focus on first. Ask questions that show seriousness: 'What would make someone highly successful in this role after six months?' and 'Are there any concerns about my background that I can address directly?' Many candidates avoid that second question, but it gives you a chance to remove doubt before decisions are made. After the interview, send a tailored follow-up that reinforces fit and addresses any important theme discussed.",
    suggestions: ["How do I stand out in the final round?", "Should I ask if they have concerns?", "What should I say in a follow-up email?"],
    radarLink: null
  },
  {
    id: 59,
    category: "Workplace conflict and politics",
    triggers: ["someone took credit", "credit stolen", "took credit for my work", "my idea was stolen", "colleague stole credit", "not getting credit"],
    diagnostic: {
      questions: [
        { text: "How did the credit issue happen?", options: ["They presented my work as theirs", "My contribution was omitted", "My manager took credit", "It happened repeatedly"] },
        { text: "How visible was the work?", options: ["Small internal task", "Important team project", "Senior leadership visibility", "Client or external visibility"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "They presented my work as theirs": "Respond quickly but professionally. Do not accuse them publicly unless the situation is severe and undeniable. First, create a factual record by sending a follow-up message that re-establishes ownership: 'I'm glad the analysis was useful. For completeness, I'm attaching the version I prepared with the assumptions and recommendations we discussed.' In future, circulate drafts before meetings with your name clearly attached. If it happens again, have a direct conversation: 'When the work was presented, my contribution was not acknowledged. I want to make sure we handle ownership clearly going forward.'",
      "My contribution was omitted": "Omission is often easier to correct than direct theft. Speak to the person leading the work and say: 'I noticed my contribution wasn't reflected in the update. Can we make sure the next communication includes the areas I led?' Then make your contribution visible through written updates, meeting notes, and stakeholder communications. The goal is not to demand applause for every task; it is to ensure your material contribution is accurately represented.",
      "My manager took credit": "This is more delicate because of the power imbalance. Build visibility before final presentations by sharing progress with stakeholders, contributing directly in meetings, and documenting your input in emails. Use language that reinforces collaboration while preserving ownership: 'Building on the work I prepared for the team...' If your manager repeatedly takes credit, start maintaining a private evidence log and seek ways to build relationships beyond your manager.",
      "It happened repeatedly": "Repeated credit theft is a pattern, not a misunderstanding. Document dates, work products, meetings, and witnesses. Then decide whether this is best addressed directly, through your manager, or through another senior sponsor. Focus on business impact: loss of accountability, confusion over ownership, and damage to collaboration. If the pattern affects performance reviews or promotion, it must be escalated with evidence."
    },
    suggestions: ["How do I claim credit without sounding petty?", "Should I confront the person?", "How do I make my work more visible?"],
    radarLink: null
  },
  {
    id: 60,
    category: "Workplace conflict and politics",
    triggers: ["excluded from decisions", "left out of meetings", "not included", "decisions made without me", "out of the loop", "not invited"],
    diagnostic: {
      questions: [
        { text: "What kind of exclusion is happening?", options: ["Left out of meetings", "Decisions made without my input", "Information not shared", "Excluded from senior visibility"] },
        { text: "Is this new or ongoing?", options: ["Started recently", "Happens occasionally", "Ongoing pattern", "Always been this way"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "Left out of meetings": "First determine whether you truly need to be in the meeting or simply need the output. If your attendance is necessary, make the case in terms of value: 'I think it would help for me to join because I own the downstream delivery and can flag implementation risks early.' Avoid framing it as personal exclusion. If you do not need to attend, ask for a decision summary and clear actions afterward.",
      "Decisions made without my input": "This is often a stakeholder-mapping problem. Identify who is making the decisions, what information they are using, and where your input should enter the process. Then create earlier touchpoints. Instead of waiting to be invited, send concise pre-decision notes: risks, options, dependencies, and recommendations. People include those who make decisions easier.",
      "Information not shared": "Create a communication mechanism rather than relying on goodwill. Ask for access to relevant channels, shared documents, or weekly updates. Say: 'To avoid delivery risk, I need visibility of decisions that affect X. What's the best way to make sure that information reaches me consistently?'",
      "Excluded from senior visibility": "If you are doing significant work but others are presenting it upward, build direct but appropriate visibility. Offer to present specific sections, send executive-ready summaries, and ask your manager what level of senior exposure is expected at your grade. If visibility is consistently blocked, it may affect progression and should become part of your career conversation."
    },
    suggestions: ["How do I get included without sounding insecure?", "What if my manager is blocking visibility?", "How do I build influence in a political workplace?"],
    radarLink: null
  },
  {
    id: 61,
    category: "Workplace conflict and politics",
    triggers: ["office politics", "workplace politics", "political workplace", "navigate politics", "company politics", "politics at work"],
    diagnostic: {
      questions: [
        { text: "What kind of politics are you dealing with?", options: ["Power struggles", "Hidden decision-making", "Favouritism", "Competing agendas"] },
        { text: "How senior is the issue?", options: ["Within my team", "Across departments", "Senior leadership level", "Whole organisation"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "Power struggles": "Do not attach yourself blindly to one faction unless you understand the consequences. Map who has formal authority, who has informal influence, and whose priorities are gaining momentum. Stay focused on business outcomes and avoid becoming the messenger for one side. In political environments, credibility comes from being reliable, discreet, and useful across groups.",
      "Hidden decision-making": "When decisions happen outside formal meetings, you need better stakeholder intelligence. Build relationships before decisions are made. Ask neutral questions: 'Who else should I align with before this moves forward?' or 'What concerns are likely to come up?' The aim is not manipulation. It is understanding the real decision process.",
      "Favouritism": "Favouritism is frustrating, but complaining rarely changes it. Focus on making your contribution visible through outcomes, relationships, and documented value. Seek sponsors beyond your immediate manager. If favouritism affects pay, promotion, or opportunity allocation in a measurable way, document specifics and consider formal channels.",
      "Competing agendas": "When leaders want different things, ask for prioritisation in writing. Say: 'I can support both objectives, but the current timelines conflict. Which outcome should take precedence?' This protects you from being blamed for impossible trade-offs and forces clarity where politics has created ambiguity."
    },
    suggestions: ["How do I stay ethical in office politics?", "How do I identify real decision-makers?", "When should I leave a political workplace?"],
    radarLink: null
  },
  {
    id: 62,
    category: "Workplace conflict and politics",
    triggers: ["conflict with peer", "argument with colleague", "peer conflict", "coworker disagreement", "colleague conflict", "can't work with colleague"],
    diagnostic: {
      questions: [
        { text: "What is the conflict mainly about?", options: ["Work quality", "Communication style", "Ownership and responsibilities", "Personal tension"] },
        { text: "What outcome do you need?", options: ["Repair relationship", "Finish the work", "Set boundaries", "Escalate fairly"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "Work quality": "Keep the conversation anchored in standards and outcomes, not personal judgement. Say: 'I'm concerned this may not meet the standard we need because...' and give specific examples. Offer a path forward: what needs changing, by when, and who owns it. If quality issues continue, document the impact on delivery before escalating.",
      "Communication style": "Name the working difference without attacking the person. For example: 'I think we're missing each other because I prefer written decisions and you tend to discuss things verbally. Can we agree that after conversations we confirm actions in writing?' Small operating agreements often resolve recurring friction.",
      "Ownership and responsibilities": "Create a clear responsibility map. Define who decides, who contributes, who executes, and who needs to be informed. Many peer conflicts come from overlapping ownership. If neither of you has authority to decide, ask your manager or project lead to clarify roles before resentment builds.",
      "Personal tension": "Do not try to resolve personality issues by debating who is right. Focus on professional behaviour. Say: 'We don't need to agree on everything personally, but we do need a working arrangement that lets us deliver.' Agree communication norms, meeting cadence, and escalation points. Keep records if behaviour becomes inappropriate."
    },
    suggestions: ["How do I have the conversation without escalating?", "What if they refuse to cooperate?", "When should I involve my manager?"],
    radarLink: null
  },
  {
    id: 63,
    category: "Workplace conflict and politics",
    triggers: ["conflict with stakeholder", "stakeholder disagreement", "stakeholder pushing back", "stakeholder conflict", "stakeholder escalation", "difficult business partner"],
    diagnostic: {
      questions: [
        { text: "What is the stakeholder conflict about?", options: ["Scope", "Timeline", "Quality expectations", "Decision authority"] },
        { text: "What is their level of power?", options: ["Same level", "More senior", "Executive", "External client"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "Scope": "Scope conflict needs a visible trade-off conversation. Document what was agreed, what has changed, and what the impact is. Say: 'We can add this, but it will affect timeline, cost, or other deliverables. Which trade-off do you prefer?' This moves the conversation from emotion to decision-making.",
      "Timeline": "Do not simply say a timeline is unrealistic. Show why. Break down dependencies, decision points, resource constraints, and risks. Offer options: reduce scope, add resources, sequence delivery, or move the deadline. Stakeholders respond better when you bring choices rather than resistance.",
      "Quality expectations": "Define quality in observable terms. Ask: 'What would good look like from your perspective?' Then compare that with available time and resources. Misalignment often happens because one side assumes excellence while the other assumes acceptable delivery. Make the standard explicit.",
      "Decision authority": "Clarify who owns the final decision. If the stakeholder is influencing but not accountable, document the decision path. Say: 'To avoid confusion, can we confirm who has final sign-off and who should be consulted?' Authority conflict becomes dangerous when accountability is unclear."
    },
    suggestions: ["How do I push back on a senior stakeholder?", "How do I avoid damaging the relationship?", "What should I document?"],
    radarLink: null
  },
  {
    id: 64,
    category: "Workplace conflict and politics",
    triggers: ["disagree with executive", "challenge senior leader", "push back on leadership", "executive disagreement", "senior leader conflict", "disagree with boss's boss"],
    diagnostic: {
      questions: [
        { text: "What kind of disagreement is it?", options: ["Strategic direction", "Timeline or resources", "Ethical concern", "Execution approach"] },
        { text: "How much evidence do you have?", options: ["Strong data", "Some evidence", "Mostly judgement", "Early concern"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "Strategic direction": "Disagree with strategy by testing assumptions, not attacking conclusions. Say: 'Can I pressure-test one assumption behind this?' or 'The risk I see is...' Executives are more receptive when you frame disagreement as risk management. Bring external context, customer evidence, financial impact, or operational constraints.",
      "Timeline or resources": "Translate your disagreement into business risk. Instead of saying 'We can't do this', say: 'The current plan creates three risks: quality, delivery confidence, and team capacity. Here are two options to reduce those risks.' Senior leaders respond better to choices than objections.",
      "Ethical concern": "Treat ethical concerns seriously and document carefully. If the issue involves legality, safety, discrimination, harassment, financial misstatement, or customer harm, do not rely only on informal conversations. Seek advice from appropriate internal channels such as HR, legal, compliance, or a trusted senior sponsor.",
      "Execution approach": "If you disagree on execution, present alternatives with trade-offs. Show that you understand the leader's objective and are trying to improve the path, not block the goal. A useful phrase is: 'I support the outcome. My concern is the route we're taking to get there.'"
    },
    suggestions: ["How do I challenge leadership respectfully?", "What if disagreeing damages my career?", "How do I know when to escalate?"],
    radarLink: null
  },
  {
    id: 65,
    category: "Workplace conflict and politics",
    triggers: ["workplace gossip", "rumours at work", "people gossiping", "office rumours", "being talked about", "gossip about me"],
    diagnostic: {
      questions: [
        { text: "What is your connection to the gossip?", options: ["People gossip to me", "People gossip about me", "Rumours affect my reputation", "Gossip is damaging the team"] },
        { text: "How serious is the impact?", options: ["Annoying but minor", "Affecting relationships", "Affecting work opportunities", "Potentially harmful or discriminatory"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "People gossip to me": "Stay neutral and do not feed the conversation. Use simple exits: 'I don't know enough to comment' or 'I'd rather not speculate.' People quickly learn who is safe for gossip and who is not. Your reputation for discretion becomes an asset.",
      "People gossip about me": "Do not chase every rumour. Identify whether it is noise or reputational risk. If a specific person is spreading false information, address it calmly: 'I've heard there may be some confusion about X. I want to clarify the facts directly.' Keep the tone factual rather than defensive.",
      "Rumours affect my reputation": "Rebuild the narrative through visible professionalism. Share facts with relevant stakeholders, document your work, and ask trusted people for honest feedback on what is being perceived. Reputation is corrected through consistent evidence, not one dramatic confrontation.",
      "Gossip is damaging the team": "If gossip is reducing trust or collaboration, managers need to address norms directly. Set expectations around respectful communication, confidentiality, and raising concerns through proper channels. If gossip involves protected characteristics, harassment, or malicious false claims, escalate through formal channels."
    },
    suggestions: ["Should I confront someone spreading rumours?", "How do I protect my reputation?", "When does gossip become harassment?"],
    radarLink: null
  },
  {
    id: 66,
    category: "Workplace conflict and politics",
    triggers: ["conflicting priorities", "two managers want different things", "competing priorities", "leaders disagree", "pulled in different directions", "multiple bosses"],
    diagnostic: {
      questions: [
        { text: "Who is creating the conflicting priorities?", options: ["Two managers", "Manager and stakeholder", "Multiple departments", "Senior leaders"] },
        { text: "What is the main risk?", options: ["Missed deadlines", "Quality drop", "Political blame", "Burnout"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "Two managers": "Do not try to privately satisfy both. Make the conflict visible in a professional way. Send a short prioritisation note: 'I currently have A and B due in the same window. Both appear high priority. Can we agree which should come first?' This prevents you becoming the hidden absorber of organisational misalignment.",
      "Manager and stakeholder": "Keep your manager informed before negotiating with the stakeholder. Say: 'The stakeholder is asking for X by Friday, which affects Y. How would you like me to prioritise?' This gives your manager the opportunity to support, override, or escalate.",
      "Multiple departments": "Create a shared priority view. List deliverables, owners, dates, dependencies, and risks. Multi-department conflict often persists because everyone sees only their own urgency. A single visible plan forces trade-off decisions.",
      "Senior leaders": "When senior leaders conflict, you need written alignment. Use neutral language: 'To ensure execution matches leadership priorities, can we confirm the decision on X?' Do not interpret politics alone. Get clarity from those with authority."
    },
    suggestions: ["How do I say no professionally?", "How do I avoid being blamed?", "What if leaders won't prioritise?"],
    radarLink: null
  },
  {
    id: 67,
    category: "Workplace conflict and politics",
    triggers: ["unfair treatment", "treated unfairly", "not treated equally", "favouritism at work", "unfair manager", "different rules for me"],
    diagnostic: {
      questions: [
        { text: "What kind of unfairness are you experiencing?", options: ["Unequal workload", "Unequal recognition", "Promotion or pay unfairness", "Different standards applied"] },
        { text: "What evidence do you have?", options: ["Clear examples", "Some patterns", "Mostly perception", "Other people noticed too"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "Unequal workload": "Track workload objectively for two to four weeks: tasks, hours, deadlines, urgency, and complexity. Then raise the issue as capacity management, not personal unfairness. Say: 'I want to make sure priorities are sustainable. Here's the current distribution of work and the risks I see.'",
      "Unequal recognition": "Make your contribution more visible before assuming intent. Send outcome-focused updates, ask to present your own work, and keep a record of achievements. If others are recognised for similar work while you are not, raise it during your development conversation with specific examples.",
      "Promotion or pay unfairness": "Separate what you know from what you suspect. Compensation and promotion comparisons can be emotionally charged, but you need evidence. Ask for the criteria, bands, process, and feedback on your own position. If you believe discrimination or bias is involved, document specifics and consider formal channels.",
      "Different standards applied": "Identify the standard and the inconsistency. For example: deadlines, flexibility, approval thresholds, or performance expectations. Raise it calmly: 'I want to understand the expectation because I have seen it handled differently in similar situations.' Specific examples are essential."
    },
    suggestions: ["How do I raise unfair treatment safely?", "What evidence do I need?", "When should this become an HR issue?"],
    radarLink: null
  },
  {
    id: 68,
    category: "Workplace conflict and politics",
    triggers: ["organizational change", "restructure", "company change", "new leadership", "department restructure", "change at work"],
    diagnostic: {
      questions: [
        { text: "What kind of change is happening?", options: ["Restructure", "New leadership", "Merger or acquisition", "Strategy shift"] },
        { text: "What is your biggest concern?", options: ["Job security", "Role clarity", "Loss of influence", "Workload increase"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "Restructure": "In a restructure, information is often incomplete. Focus on what you can control: understanding the new priorities, documenting your impact, maintaining relationships, and staying visible. Ask your manager what outcomes matter most in the new structure and how your role may change. Avoid relying on rumours.",
      "New leadership": "New leaders reassess talent quickly. Prepare a concise summary of your responsibilities, results, current priorities, and risks. Ask what they want to preserve, change, or accelerate. Your goal is to become useful early rather than wait to be evaluated passively.",
      "Merger or acquisition": "Mergers create duplication risk and political uncertainty. Identify which capabilities are most valuable to the combined organisation. Build relationships beyond your legacy team and document institutional knowledge that would be costly to lose.",
      "Strategy shift": "When strategy changes, old success metrics may stop mattering. Re-anchor your work to the new priorities. Ask: 'Which activities should we stop, start, or accelerate given the new direction?' Adaptability becomes visible during transition."
    },
    suggestions: ["How do I protect my role during change?", "What questions should I ask leadership?", "How do I avoid being sidelined?"],
    radarLink: null
  },
  {
    id: 69,
    category: "Redundancy and job loss",
    triggers: ["made redundant", "lost my job", "laid off", "job eliminated", "redundancy", "unexpected layoff"],
    diagnostic: {
      questions: [
        { text: "Where are you in the process?", options: ["Just found out", "Consultation period", "Already left", "Expecting it soon"] },
        { text: "What is your biggest immediate concern?", options: ["Money", "Confidence", "Finding work quickly", "Explaining it to others"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "Just found out": "Do not make major decisions in the first 24 hours unless there is a deadline. Redundancy is both a practical event and an emotional shock. First, gather documents: notice period, severance terms, unused holiday, benefits, references, and any consultation process. Ask what support is available, including outplacement, career coaching, or training budget. Then create a short-term plan for the next two weeks: financial review, CV update, LinkedIn refresh, and outreach to trusted contacts.",
      "Consultation period": "Use consultation actively. Ask how roles were selected, what alternative roles exist, whether redeployment is possible, and whether severance terms are negotiable. Keep notes from every meeting. Consultation is not just a formality; it is your chance to clarify options and protect your interests.",
      "Already left": "Shift from processing to rebuilding structure. Create a weekly job-search routine with time blocks for applications, networking, interview preparation, and recovery. Do not spend every hour applying online. Your network will often produce stronger leads than job boards.",
      "Expecting it soon": "Prepare quietly and professionally. Update your CV, save non-confidential examples of your achievements, reconnect with recruiters, review finances, and understand company policy. Do not take confidential data or behave impulsively. Leave with relationships intact where possible."
    },
    suggestions: ["What should I do in the first week after redundancy?", "How do I explain redundancy in interviews?", "Can I negotiate redundancy terms?"],
    radarLink: null
  },
  {
    id: 70,
    category: "Redundancy and job loss",
    triggers: ["layoff warning signs", "redundancy signs", "company layoffs coming", "worried about layoffs", "job at risk", "signs I might be laid off"],
    diagnostic: {
      questions: [
        { text: "What warning signs are you seeing?", options: ["Budget cuts", "Hiring freeze", "Work disappearing", "Leadership silence"] },
        { text: "How exposed does your role feel?", options: ["Essential role", "Somewhat exposed", "Highly exposed", "Not sure"] }
      ]
    },
    response: null,
    diagnosticResponses: {
      "Budget cuts": "Budget cuts do not always mean layoffs, but they do signal tighter scrutiny. Make your contribution measurable. Document cost savings, revenue support, operational necessity, risk reduction, and customer impact. In downturns, roles attached to clear business value are easier to defend.",
      "Hiring freeze": "A hiring freeze often means the company is controlling costs while assessing conditions. Use the time to strengthen internal relevance and external readiness at the same time. Update your CV, reconnect with contacts, and ask your manager which priorities are most critical now.",
      "Work disappearing": "If meaningful work is being reassigned or your calendar is emptying, take it seriously. Ask for clarity: 'I want to make sure I'm focused on the most valuable work. Which priorities should I own this quarter?' Lack of work can be a stronger warning sign than public announcements.",
      "Leadership silence": "Silence creates rumours. Do not rely on speculation alone. Watch for concrete signals: cancelled projects, reduced budgets, leadership departures, delayed decisions, and restructuring consultants. Prepare professionally without panicking."
    },
    suggestions: ["How do I prepare for a possible layoff?", "Should I start applying now?", "How do I make my role look essential?"],
    radarLink: null
  }
,
{
  id: 91,
  category: "Career confidence and imposter syndrome",
  triggers: ["perfectionism", "need everything perfect", "afraid of mistakes", "perfectionist at work", "can't let go"],
  diagnostic: null,
  response: "Perfectionism is often rewarded early in a career because it improves quality and reliability. The problem is that it eventually becomes a constraint. Senior professionals are expected to make decisions with incomplete information, balance speed against quality, and accept that some outcomes will be imperfect. Start by identifying where perfection is genuinely required and where excellence is sufficient. A regulatory submission, security review, or financial statement may require near-perfect accuracy. A first draft, internal presentation, or exploratory analysis usually does not. Before starting important work, define what 'good enough' looks like. This prevents standards from expanding indefinitely. If you repeatedly spend disproportionate time polishing details, ask yourself whether the additional effort changes the business outcome. The goal is not lower standards. It is applying the right standard to the right situation. Many high performers discover that career progression accelerates when they focus less on flawless execution and more on delivering value, influence, and outcomes.",
  suggestions: ["How do I stop overworking tasks?", "What is good enough?", "Can perfectionism hurt promotion chances?"],
  radarLink: null
},
{
  id: 92,
  category: "Career confidence and imposter syndrome",
  triggers: ["fear of leadership", "scared to lead", "not ready to lead", "leadership confidence", "management anxiety"],
  diagnostic: null,
  response: "Most future leaders assume they need to feel completely confident before taking on leadership responsibility. In practice, leadership confidence develops after responsibility arrives, not before. Focus on building evidence rather than certainty. Volunteer to lead projects, mentor junior colleagues, facilitate meetings, or coordinate cross-functional initiatives. These experiences create leadership proof without requiring a formal title. Remember that leadership is not about having all the answers. It is about helping others make progress despite uncertainty. When self-doubt appears, ask yourself a better question: 'What would I advise someone else to do in this situation?' That perspective often reveals that your judgement is stronger than your confidence suggests. Leadership capability is built through repeated exposure to responsibility, feedback, and reflection. Few effective leaders began their careers feeling fully prepared.",
  suggestions: ["How do I prepare for management?", "What leadership skills matter most?", "How do I overcome self-doubt?"],
  radarLink: { label: "Explore Program Management career ladder", path: "program_management" }
},
{
  id: 93,
  category: "Career confidence and imposter syndrome",
  triggers: ["fear of visibility", "don't want attention", "avoid recognition", "visible at work", "career visibility"],
  diagnostic: null,
  response: "Many talented professionals avoid visibility because they associate it with self-promotion. The reality is that visibility is simply awareness of value. If decision-makers do not understand your contribution, they cannot advocate for you, allocate opportunities, or support progression. Start with low-risk visibility. Share project updates, present lessons learned, contribute to discussions, and document outcomes. Focus on the work rather than yourself. Instead of saying 'Look what I did', say 'Here is what the team achieved and what we learned.' Visibility becomes easier when it is framed as helping others understand progress rather than seeking recognition. Remember that opportunities often go to the people whose capabilities are visible, not necessarily the people working hardest behind the scenes.",
  suggestions: ["How do I become more visible?", "How do I avoid sounding arrogant?", "Does visibility affect promotion?"],
  radarLink: null
},
{
  id: 94,
  category: "Career confidence and imposter syndrome",
  triggers: ["failed at work", "career failure", "mistake at work", "professional setback", "lost confidence after failure"],
  diagnostic: null,
  response: "Career setbacks feel personal because they often affect identity as much as outcomes. The most productive response is structured reflection. Separate facts from interpretation. What actually happened? What contributed to the outcome? What was within your control? What was outside it? Then identify the lesson that would have prevented or reduced the problem. Avoid the trap of turning one failure into a global judgement about your ability. Strong careers are rarely built on uninterrupted success. They are built on learning, adaptation, and resilience. Many senior leaders can point to projects that failed, promotions they missed, or decisions they regret. What differentiates them is how they responded. Use the experience as data, not a verdict. Confidence rebuilt through learning is usually stronger than confidence that has never been tested.",
  suggestions: ["How do I recover after failure?", "Should I talk about failures in interviews?", "How do I stop replaying mistakes?"],
  radarLink: null
},
{
  id: 95,
  category: "Career confidence and imposter syndrome",
  triggers: ["confidence after redundancy", "layoff confidence", "job loss confidence", "career confidence after layoff"],
  diagnostic: null,
  response: "Redundancy often damages confidence because people interpret a business decision as a judgement on their worth. Most redundancies are driven by economics, restructuring, strategy shifts, or organisational priorities rather than individual capability. Rebuild confidence through evidence. Create a record of achievements, projects delivered, problems solved, and positive feedback received throughout your career. Then reconnect with people who have worked with you successfully. Their perspective often provides a more accurate picture than your internal narrative. Treat redundancy as a chapter, not a definition. The objective is not to pretend it was easy. The objective is to prevent one event from rewriting your entire professional identity.",
  suggestions: ["How do I rebuild confidence quickly?", "How do I explain redundancy?", "How do I stop doubting myself?"],
  radarLink: null
},
{
  id: 96,
  category: "Career confidence and imposter syndrome",
  triggers: ["executive confidence", "confidence with senior leaders", "intimidated by executives", "executive presence anxiety"],
  diagnostic: null,
  response: "Many professionals become less confident around senior leaders because they focus on hierarchy instead of value. Executives are usually interested in outcomes, risks, decisions, and progress. Prepare accordingly. Before meetings, identify the key message, supporting evidence, and decision required. Speak in terms of business impact rather than technical detail unless requested. Confidence in executive settings comes from preparation and relevance. You do not need to sound like an executive. You need to help executives make better decisions. The moment you focus on contributing value rather than managing impressions, conversations often become easier.",
  suggestions: ["How do I build executive presence?", "What do executives care about most?", "How do I stop feeling intimidated?"],
  radarLink: null
},
{
  id: 97,
  category: "First 90 days in a new role",
  triggers: ["new job first week", "first week in role", "starting new job", "new position advice"],
  diagnostic: null,
  response: "The first week of a new role should focus on learning rather than proving yourself. Meet key stakeholders, understand expectations, and identify how success is measured. Create a stakeholder map and note what each person cares about. Ask thoughtful questions about priorities, risks, and current challenges. Avoid making major changes before understanding the context. New employees sometimes damage credibility by trying to demonstrate expertise too quickly. Your goal is to build trust, gather information, and establish productive working relationships. Strong starts are usually driven by curiosity, not certainty.",
  suggestions: ["What questions should I ask?", "How do I make a good first impression?", "What should I avoid doing?"],
  radarLink: null
},
{
  id: 98,
  category: "First 90 days in a new role",
  triggers: ["stakeholder map", "understand stakeholders", "new role stakeholders", "stakeholder relationships"],
  diagnostic: null,
  response: "Stakeholder mapping is one of the highest-return activities in the first 90 days. List everyone who influences your success: managers, peers, customers, technical experts, executive sponsors, and operational partners. Then identify their priorities, concerns, communication preferences, and decision-making authority. Strong performers understand that success depends as much on relationships as technical capability. Schedule introductory conversations and ask: what does success look like from your perspective, what challenges should I understand, and how can I support your objectives? This information becomes invaluable when priorities compete or difficult decisions emerge later.",
  suggestions: ["Who should be on my stakeholder map?", "How often should I meet stakeholders?", "How do I build trust quickly?"],
  radarLink: { label: "Explore Program Management career ladder", path: "program_management" }
},
{
  id: 99,
  category: "First 90 days in a new role",
  triggers: ["build credibility", "new role credibility", "earn trust quickly", "prove myself at work"],
  diagnostic: null,
  response: "Credibility is earned through reliability, not grand gestures. In your first 90 days, identify a few achievable commitments and deliver them consistently. Follow through on promises, communicate clearly, and meet deadlines. Listen more than you speak during the early weeks. Credibility grows when people see that you understand the environment and can be trusted to execute. Look for a quick win that solves a genuine problem without disrupting existing relationships. Small, visible successes often create more trust than ambitious transformation plans.",
  suggestions: ["What counts as a quick win?", "How do I earn trust faster?", "How do I avoid overpromising?"],
  radarLink: null
},
{
  id: 100,
  category: "First 90 days in a new role",
  triggers: ["new manager relationship", "working with new boss", "relationship with manager", "new boss expectations"],
  diagnostic: null,
  response: "Your relationship with your manager is one of the most important variables in your early success. Clarify expectations quickly. Ask how they prefer updates, what success looks like, how they make decisions, and what concerns they have about the role. Observe their communication style and adapt where appropriate. Schedule regular one-to-ones and come prepared with updates, decisions required, and questions. Managers gain confidence when they see structure, transparency, and progress. The objective is not to impress your manager. It is to make it easy for them to trust you.",
  suggestions: ["What should I ask a new manager?", "How often should we meet?", "How do I build trust?"],
  radarLink: null
},
{
  id: 101,
  category: "First 90 days in a new role",
  triggers: ["inherited struggling team", "new manager difficult team", "team performance issues", "leading struggling team"],
  diagnostic: null,
  response: "When inheriting a struggling team, resist the urge to fix everything immediately. Spend time understanding the root causes. Are the issues related to capability, workload, priorities, leadership, processes, or morale? Meet team members individually and ask what helps them succeed and what gets in their way. Look for recurring themes. Establish clear expectations and focus on creating stability before transformation. Teams often improve when uncertainty decreases. Early credibility comes from listening, diagnosing accurately, and making thoughtful changes rather than dramatic ones.",
  suggestions: ["How do I assess a team quickly?", "What should I change first?", "How do I build trust with the team?"],
  radarLink: { label: "Explore Program Management career ladder", path: "program_management" }
},
{
  id: 102,
  category: "First 90 days in a new role",
  triggers: ["political organization", "political workplace", "new company politics", "office politics new role"],
  diagnostic: null,
  response: "Joining a political organisation requires observation before action. Identify who has formal authority, who has informal influence, and how decisions actually get made. Avoid taking sides early. Build relationships broadly and remain professional with different groups. Ask neutral questions about priorities, history, and stakeholder concerns. Political awareness is not manipulation. It is understanding the environment so you can navigate it effectively. The people who struggle most are often those who assume official structures tell the whole story.",
  suggestions: ["How do I identify key influencers?", "Should I stay out of politics?", "How do I avoid mistakes?"],
  radarLink: null
},
{
  id: 103,
  category: "First 90 days in a new role",
  triggers: ["90 day goals", "new role goals", "first 90 days plan", "new job objectives"],
  diagnostic: null,
  response: "Strong 90-day goals focus on learning, relationships, credibility, and early impact. Divide the period into phases. First 30 days: learn and observe. Second 30 days: build relationships and identify opportunities. Final 30 days: deliver visible outcomes. Ensure goals are aligned with business priorities rather than personal preferences. Discuss them with your manager and confirm expectations. The best 90-day plans create momentum without creating unrealistic pressure.",
  suggestions: ["What should my first goals be?", "How detailed should a 90-day plan be?", "How do I measure success?"],
  radarLink: null
},
{
  id: 104,
  category: "First 90 days in a new role",
  triggers: ["onboarding mistakes", "new role mistakes", "avoid mistakes new job", "first 90 days mistakes"],
  diagnostic: null,
  response: "Common onboarding mistakes include trying to prove expertise too quickly, making assumptions before understanding context, ignoring relationships, and overcommitting. New hires sometimes focus entirely on tasks while neglecting stakeholder trust. Others criticise existing processes before understanding why they exist. Approach the first 90 days with curiosity rather than judgement. Learn first, then improve. Relationships built early often determine how much support you receive later.",
  suggestions: ["What should I avoid in a new role?", "How do I learn faster?", "How do I build credibility?"],
  radarLink: null
},
{
  id: 105,
  category: "Building visibility and personal brand",
  triggers: ["invisible at work", "not getting noticed", "work not recognised", "low visibility"],
  diagnostic: null,
  response: "Being invisible at work is often a communication problem rather than a performance problem. Decision-makers cannot recognise value they do not see. Create visibility around outcomes, not effort. Share progress updates, present results, contribute to discussions, and ensure your work is connected to business impact. Visibility should be informative rather than promotional. The objective is to help others understand where value is being created. Careers frequently stall not because capability is missing but because capability is hidden.",
  suggestions: ["How do I get recognised?", "How do I share achievements professionally?", "Does visibility affect promotion?"],
  radarLink: null
},
{
  id: 106,
  category: "Building visibility and personal brand",
  triggers: ["personal brand at work", "professional reputation", "internal brand", "career reputation"],
  diagnostic: null,
  response: "Your personal brand already exists whether you manage it or not. It is the collection of expectations people associate with your name. Ask trusted colleagues what they rely on you for. Their answers reveal your current brand. Then decide whether it aligns with your goals. If you want to be known for strategic thinking, leadership, technical expertise, or customer focus, create consistent evidence. Reputations are built through repeated behaviour, not isolated achievements. The strongest professional brands are clear, credible, and useful.",
  suggestions: ["How do I build a strong reputation?", "What should I be known for?", "Can personal branding feel authentic?"],
  radarLink: null
},
{
  id: 107,
  category: "Building visibility and personal brand",
  triggers: ["linkedin thought leadership", "industry content", "professional content", "linkedin visibility"],
  diagnostic: null,
  response: "Thought leadership is not about appearing smarter than everyone else. It is about helping people understand problems, trends, and solutions. Share practical insights from your experience, lessons learned, and observations about your industry. Consistency matters more than frequency. Focus on usefulness rather than popularity. Strong professional content builds credibility because it demonstrates thinking, communication, and expertise simultaneously.",
  suggestions: ["What should I post about?", "How often should I publish?", "How do I avoid sounding self-promotional?"],
  radarLink: null
},
{
  id: 108,
  category: "Building visibility and personal brand",
  triggers: ["executive visibility", "visible to leadership", "senior leadership exposure", "executive exposure"],
  diagnostic: null,
  response: "Executive visibility comes from solving important problems, communicating clearly, and operating reliably under pressure. Look for opportunities to contribute to strategic initiatives, present concise updates, and participate in cross-functional work. Focus on making leaders' lives easier by providing clarity, insight, and execution. Visibility without value is noise. Value without visibility is often overlooked. The goal is to combine both.",
  suggestions: ["How do I get leadership exposure?", "What do executives notice?", "How do I communicate with leaders?"],
  radarLink: null
},
{
  id: 109,
  category: "Building visibility and personal brand",
  triggers: ["speaking opportunities", "conference speaking", "public speaking career", "industry speaker"],
  diagnostic: null,
  response: "Speaking opportunities are credibility accelerators because they demonstrate expertise publicly. Start smaller than you think. Internal presentations, team knowledge-sharing sessions, and local industry events are often better starting points than major conferences. Build a small portfolio of topics you know well and can explain clearly. Event organisers look for useful content, not perfect speakers. Every presentation creates evidence of expertise and communication ability.",
  suggestions: ["How do I get speaking opportunities?", "What topics should I present?", "How do I overcome nerves?"],
  radarLink: null
},
{
  id: 110,
  category: "Building visibility and personal brand",
  triggers: ["cross functional reputation", "build reputation across company", "known across departments", "internal networking"],
  diagnostic: null,
  response: "Cross-functional reputation becomes increasingly important as careers progress. People often receive opportunities from teams they have never worked in directly. Build relationships beyond your immediate area. Participate in projects, communities of practice, mentoring, and knowledge-sharing initiatives. Focus on being reliable, collaborative, and helpful. Reputation spreads through repeated interactions. The goal is not to know everyone. It is to ensure that when your name appears in a discussion, people associate it with positive outcomes and professionalism.",
  suggestions: ["How do I network internally?", "How do I build credibility across teams?", "Why does reputation matter?"],
  radarLink: null
}
,
{
  id: 111,
  category: "Building visibility and personal brand",
  triggers: ["be known as expert", "subject matter expert", "industry expert", "known for expertise", "build expertise reputation"],
  diagnostic: null,
  response: "Becoming known as an expert is usually the result of consistency rather than brilliance. Choose a domain where you want to build credibility and deliberately deepen your knowledge over time. Share insights, solve difficult problems, document lessons learned, and help others succeed. Expertise becomes visible when people repeatedly associate your name with useful answers and reliable judgement. Focus on creating evidence rather than claiming authority. Write, teach, mentor, present, and contribute to important discussions. Over time, reputation compounds. The strongest experts are trusted not because they know everything, but because they consistently help others make better decisions.",
  suggestions: ["How do I choose a specialty?", "Should I publish content?", "How long does it take to build expertise?"],
  radarLink: null
},
{
  id: 112,
  category: "Building visibility and personal brand",
  triggers: ["strategic networking", "networking strategy", "build professional network", "career network", "network intentionally"],
  diagnostic: null,
  response: "Strategic networking is about building mutually valuable relationships before opportunities arise. Map the people who influence your industry, profession, and future goals. Focus on learning rather than extracting value. Ask thoughtful questions, share useful information, and maintain contact consistently. Strong networks are diverse. Include peers, senior leaders, recruiters, mentors, customers, and specialists. Instead of trying to meet hundreds of people, aim to build genuine relationships with a smaller group over time. Career opportunities often emerge through trust long before they appear publicly.",
  suggestions: ["How many people should I network with?", "How do I stay in touch?", "What do I say when reaching out?"],
  radarLink: null
},
{
  id: 113,
  category: "Remote work and hybrid challenges",
  triggers: ["remote visibility", "out of sight out of mind", "working remotely and invisible", "remote recognition"],
  diagnostic: {
    questions: [
      { text: "What concerns you most?", options: ["Promotion opportunities", "Recognition", "Communication", "Relationship building"] }
    ]
  },
  response: null,
  diagnosticResponses: {
    "Promotion opportunities": "Remote employees sometimes assume performance alone guarantees progression. Increase visibility through regular updates, presentations, and stakeholder engagement.",
    "Recognition": "Make outcomes visible. Share achievements, lessons learned, and project milestones in appropriate forums.",
    "Communication": "Communicate proactively rather than waiting to be asked. Visibility often follows communication quality.",
    "Relationship building": "Create deliberate touchpoints. Informal conversations disappear remotely unless you replace them intentionally."
  },
  suggestions: ["How do I stay visible remotely?", "Do remote workers get promoted less?", "How often should I update stakeholders?"],
  radarLink: null
},
{
  id: 114,
  category: "Remote work and hybrid challenges",
  triggers: ["hybrid disadvantage", "office workers favoured", "remote disadvantage", "hybrid work concerns"],
  diagnostic: {
    questions: [
      { text: "Where do you feel disadvantaged?", options: ["Visibility", "Networking", "Promotion", "Information access"] }
    ]
  },
  response: null,
  diagnosticResponses: {
    "Visibility": "Create structured visibility through updates, presentations, and cross-functional work.",
    "Networking": "Build relationships intentionally rather than relying on chance encounters.",
    "Promotion": "Understand promotion criteria and ensure your achievements are documented.",
    "Information access": "Request consistent communication channels and decision summaries."
  },
  suggestions: ["How do I compete fairly?", "Should I spend more time in the office?", "How do I avoid missing opportunities?"],
  radarLink: null
},
{
  id: 115,
  category: "Remote work and hybrid challenges",
  triggers: ["remote communication", "virtual communication", "remote team communication", "distributed team"],
  diagnostic: {
    questions: [
      { text: "What communication issue is biggest?", options: ["Misunderstandings", "Slow responses", "Too many meetings", "Lack of connection"] }
    ]
  },
  response: null,
  diagnosticResponses: {
    "Misunderstandings": "Increase clarity. Document decisions, assumptions, and actions.",
    "Slow responses": "Set expectations around urgency and response times.",
    "Too many meetings": "Replace low-value meetings with written updates where possible.",
    "Lack of connection": "Create opportunities for informal interaction and relationship building."
  },
  suggestions: ["How do I improve remote communication?", "How many meetings are too many?", "How do I build trust virtually?"],
  radarLink: null
},
{
  id: 116,
  category: "Remote work and hybrid challenges",
  triggers: ["remote isolation", "lonely working from home", "isolated remote worker", "remote loneliness"],
  diagnostic: {
    questions: [
      { text: "What do you miss most?", options: ["Social interaction", "Collaboration", "Learning from others", "Sense of belonging"] }
    ]
  },
  response: null,
  diagnosticResponses: {
    "Social interaction": "Create regular social contact inside and outside work.",
    "Collaboration": "Increase participation in team discussions and projects.",
    "Learning from others": "Schedule mentoring, shadowing, or informal knowledge-sharing sessions.",
    "Sense of belonging": "Contribute visibly to team culture and shared goals."
  },
  suggestions: ["How do I feel less isolated?", "Should I work from a coworking space?", "How do I stay connected?"],
  radarLink: null
},
{
  id: 117,
  category: "Remote work and hybrid challenges",
  triggers: ["manage remote team", "leading remote employees", "remote leadership", "remote management"],
  diagnostic: {
    questions: [
      { text: "What is the biggest challenge?", options: ["Performance visibility", "Engagement", "Communication", "Trust"] }
    ]
  },
  response: null,
  diagnosticResponses: {
    "Performance visibility": "Measure outcomes rather than activity.",
    "Engagement": "Create regular conversations focused on wellbeing and progress.",
    "Communication": "Establish clear rhythms for updates and decisions.",
    "Trust": "Give autonomy while maintaining accountability."
  },
  suggestions: ["How do I lead remotely?", "How do I build trust?", "How do I monitor performance?"],
  radarLink: { label: "Explore Program Management career ladder", path: "program_management" }
},
{
  id: 118,
  category: "Remote work and hybrid challenges",
  triggers: ["distributed stakeholders", "remote stakeholders", "virtual stakeholder management"],
  diagnostic: {
    questions: [
      { text: "What is hardest?", options: ["Alignment", "Communication", "Influence", "Decision making"] }
    ]
  },
  response: null,
  diagnosticResponses: {
    "Alignment": "Create shared goals and regular checkpoints.",
    "Communication": "Use consistent channels and summaries.",
    "Influence": "Build credibility through reliability and responsiveness.",
    "Decision making": "Clarify ownership and escalation paths."
  },
  suggestions: ["How do I influence remotely?", "How do I align distributed teams?", "How do I reduce misunderstandings?"],
  radarLink: null
},
{
  id: 119,
  category: "Remote work and hybrid challenges",
  triggers: ["remote onboarding", "starting remote job", "virtual onboarding"],
  diagnostic: {
    questions: [
      { text: "What is the biggest difficulty?", options: ["Learning the role", "Meeting people", "Understanding culture", "Getting support"] }
    ]
  },
  response: null,
  diagnosticResponses: {
    "Learning the role": "Document processes and ask frequent questions early.",
    "Meeting people": "Schedule introductions proactively.",
    "Understanding culture": "Observe communication norms and decision-making patterns.",
    "Getting support": "Clarify where help comes from and who owns what."
  },
  suggestions: ["How do I onboard remotely?", "How do I build relationships?", "How do I learn faster?"],
  radarLink: null
},
{
  id: 120,
  category: "Remote work and hybrid challenges",
  triggers: ["work from home productivity", "remote productivity", "productive at home", "distractions at home"],
  diagnostic: {
    questions: [
      { text: "What hurts productivity most?", options: ["Distractions", "Motivation", "Poor structure", "Too many interruptions"] }
    ]
  },
  response: null,
  diagnosticResponses: {
    "Distractions": "Design your environment to reduce friction and interruptions.",
    "Motivation": "Focus on routines rather than motivation alone.",
    "Poor structure": "Create a clear schedule with defined priorities.",
    "Too many interruptions": "Protect blocks of focused work."
  },
  suggestions: ["How do I stay productive at home?", "How do I structure my day?", "How do I avoid distractions?"],
  radarLink: null
},
{
  id: 121,
  category: "Returning to work after a gap",
  triggers: ["return after parenting", "career break parenting", "back to work after children"],
  diagnostic: null,
  response: "Returning after a parenting-related career break requires confidence in the value you still bring. Many professionals underestimate how much capability remains transferable. Organisation, prioritisation, resilience, communication, and decision-making do not disappear during a break. Update technical knowledge where necessary, rebuild your network, and prepare a confident explanation of the gap. Focus on readiness rather than apology.",
  suggestions: ["How do I explain the gap?", "How do I rebuild confidence?", "Should I retrain?"],
  radarLink: null
},
{
  id: 122,
  category: "Returning to work after a gap",
  triggers: ["return after illness", "career break illness", "back to work after health issue"],
  diagnostic: null,
  response: "Returning after illness requires balancing ambition with sustainability. Focus on rebuilding consistency before chasing rapid progression. Clarify any adjustments you need, communicate expectations early, and avoid comparing your current capacity to your previous peak. Long-term success depends on pacing, support, and realistic planning.",
  suggestions: ["How do I explain health gaps?", "Should I disclose illness?", "How do I rebuild stamina?"],
  radarLink: null
},
{
  id: 123,
  category: "Returning to work after a gap",
  triggers: ["return after sabbatical", "career break travel", "sabbatical return"],
  diagnostic: null,
  response: "A sabbatical can be positioned as a deliberate investment in growth rather than an absence from work. Focus on what you learned, how you used the time, and why you are now ready to re-engage professionally. Employers are usually more interested in readiness than in the details of the break itself.",
  suggestions: ["How do I explain a sabbatical?", "Will employers see it negatively?", "How do I restart my network?"],
  radarLink: null
},
{
  id: 124,
  category: "Returning to work after a gap",
  triggers: ["long unemployment", "out of work for years", "employment gap", "job search after long break"],
  diagnostic: null,
  response: "Long employment gaps are best addressed through evidence of ongoing activity. Highlight learning, volunteering, consulting, caregiving, projects, or professional development. Employers are looking for signs of capability, motivation, and readiness. Create fresh evidence wherever possible before applying broadly.",
  suggestions: ["How do I explain a long gap?", "Should I do volunteer work?", "How do I rebuild momentum?"],
  radarLink: null
},
{
  id: 125,
  category: "Returning to work after a gap",
  triggers: ["caregiving break", "return after caring responsibilities", "career break caring"],
  diagnostic: null,
  response: "Caring responsibilities often develop valuable skills such as prioritisation, resilience, communication, and crisis management. When returning to work, focus on readiness and capability rather than trying to minimise the break. Employers respond best when the explanation is confident, concise, and forward-looking.",
  suggestions: ["How do I discuss caregiving?", "How do I rebuild confidence?", "Should I mention the details?"],
  radarLink: null
},
{
  id: 126,
  category: "Returning to work after a gap",
  triggers: ["return after study", "finished degree", "back to work after education"],
  diagnostic: null,
  response: "Education gaps are often easier to explain because they have a clear purpose. Focus on how your learning translates into business value. Employers are less interested in the qualification itself than in the capability it creates.",
  suggestions: ["How do I connect study to jobs?", "Should I highlight projects?", "How do I show practical experience?"],
  radarLink: null
},
{
  id: 127,
  category: "Returning to work after a gap",
  triggers: ["rebuild network", "professional network after break", "networking after career gap"],
  diagnostic: null,
  response: "Start reconnecting with former colleagues, managers, clients, and peers before you need opportunities. Most people are happy to reconnect when approached genuinely. Focus on conversations, not requests. Strong networks create information, introductions, and confidence.",
  suggestions: ["Who should I contact first?", "What should I say?", "How often should I reconnect?"],
  radarLink: null
},
{
  id: 128,
  category: "Returning to work after a gap",
  triggers: ["return to leadership", "leadership after career break", "back to management"],
  diagnostic: null,
  response: "Returning directly into leadership requires demonstrating both credibility and readiness. Refresh your understanding of current industry trends, reconnect with stakeholders, and prepare evidence from your previous leadership experience. Confidence comes from demonstrating that your judgement remains strong, even if your recent experience looks different.",
  suggestions: ["Can I return directly to management?", "How do I rebuild leadership credibility?", "What should I focus on first?"],
  radarLink: { label: "Explore Program Management career ladder", path: "program_management" }
},
{
  id: 129,
  category: "Managing upwards",
  triggers: ["overwhelmed boss", "manager overloaded", "boss too busy", "support my manager"],
  diagnostic: null,
  response: "An overwhelmed manager often needs fewer problems and more clarity. Instead of escalating every issue, bring recommendations. Structure updates around decisions, risks, and actions required. Anticipate questions before they arise. Managers trust people who reduce complexity. Supporting an overloaded boss does not mean absorbing unlimited work. It means making prioritisation and decision-making easier.",
  suggestions: ["How do I manage up effectively?", "How do I help without overcommitting?", "How do I build trust?"],
  radarLink: null
},
{
  id: 130,
  category: "Managing upwards",
  triggers: ["influence without authority", "no authority", "convince people", "influence stakeholders"],
  diagnostic: null,
  response: "Influence without authority is one of the most important career skills. Start by understanding what matters to the people you need to influence. Build credibility through expertise, reliability, and relationships. Present recommendations in terms of their priorities rather than your preferences. People rarely change because they are told to. They change when they understand how a decision helps them achieve something important.",
  suggestions: ["How do I become more influential?", "How do I gain buy-in?", "How do I handle resistance?"],
  radarLink: { label: "Explore Program Management career ladder", path: "program_management" }
}
,
{
  id: 131,
  category: "Managing upwards",
  triggers: ["manager support", "need manager backing", "manager won't support me", "get support from boss"],
  diagnostic: null,
  response: "Manager support is usually earned through trust, clarity, and predictability. Make it easy for your manager to advocate for you by keeping them informed before problems become surprises. Share progress, risks, and decisions regularly. When requesting support, be specific. Instead of saying 'I need help', explain exactly what decision, resource, introduction, or escalation is required. Managers are more likely to support people who demonstrate ownership and bring solutions alongside problems.",
  suggestions: ["How do I build trust with my manager?", "What if they still won't help?", "How often should I update them?"],
  radarLink: null
},
{
  id: 132,
  category: "Managing upwards",
  triggers: ["deliver bad news", "tell boss bad news", "project issue", "escalate problem"],
  diagnostic: null,
  response: "Bad news becomes worse when delayed. Communicate issues early, with context and options. Structure conversations around three points: what happened, what it means, and what can be done next. Avoid hiding problems or presenting only obstacles. Leaders expect challenges. What they value is visibility, judgement, and ownership. If possible, present recommended actions rather than waiting for instructions.",
  suggestions: ["How early should I escalate?", "What if I caused the problem?", "How do I avoid blame?"],
  radarLink: null
},
{
  id: 133,
  category: "Managing upwards",
  triggers: ["executive priorities", "align with leadership", "what leadership wants", "executive expectations"],
  diagnostic: null,
  response: "To align with executive priorities, understand how success is measured at senior levels. Read strategy documents, earnings reports, leadership communications, and major initiatives. Translate your work into business outcomes such as revenue, efficiency, customer impact, risk reduction, or growth. The more clearly you connect your work to organisational goals, the easier it becomes for leaders to see your value.",
  suggestions: ["How do I learn executive priorities?", "What do leaders care about?", "How do I align my work?"],
  radarLink: null
},
{
  id: 134,
  category: "Managing upwards",
  triggers: ["conflicting leaders", "two bosses", "leaders disagree", "different instructions"],
  diagnostic: null,
  response: "When leaders disagree, avoid becoming the hidden decision-maker. Make the conflict visible respectfully. Summarise the competing priorities and ask for alignment. Use language such as: 'I want to make sure execution reflects leadership priorities. Can we confirm which outcome takes precedence?' Written clarification protects you from confusion and political risk.",
  suggestions: ["How do I avoid being blamed?", "Should I pick a side?", "What if leaders refuse to align?"],
  radarLink: null
},
{
  id: 135,
  category: "Managing upwards",
  triggers: ["new manager trust", "build trust with boss", "new boss relationship"],
  diagnostic: null,
  response: "Trust with a new manager develops through reliability. Learn how they prefer to communicate, make decisions, and receive updates. Deliver small commitments consistently before attempting larger changes. Clarify expectations early and follow through. Trust is rarely built through one impressive action. It is built through repeated evidence that you can be relied upon.",
  suggestions: ["What should I ask a new manager?", "How do I build credibility?", "How long does trust take?"],
  radarLink: null
},
{
  id: 136,
  category: "Managing upwards",
  triggers: ["escalate issue", "when to escalate", "raise concern", "management escalation"],
  diagnostic: null,
  response: "Escalation should occur when a problem exceeds your authority, resources, or ability to resolve it. Escalate early enough to create options, but not so early that it appears you avoided ownership. Explain the issue, impact, actions already taken, and support required. Effective escalation demonstrates judgement, not weakness.",
  suggestions: ["What should I include in an escalation?", "How do I avoid over-escalating?", "Who should I involve?"],
  radarLink: null
},
{
  id: 137,
  category: "AI and job security concerns",
  triggers: ["will ai replace my job", "ai taking jobs", "job automation", "ai threat"],
  diagnostic: null,
  response: "The more useful question is not whether AI will replace your job, but which parts of your job can be automated. Most roles contain tasks, decisions, relationships, and judgement. AI tends to automate repetitive, predictable work first. Focus on strengthening skills that complement AI: problem-solving, stakeholder management, communication, creativity, leadership, and domain expertise. Professionals who learn to use AI effectively are often more resilient than those who ignore it.",
  suggestions: ["How do I future-proof my career?", "What skills are safest?", "How should I learn AI?"],
  radarLink: null
},
{
  id: 138,
  category: "AI and job security concerns",
  triggers: ["ai knowledge work", "ai office jobs", "ai white collar work"],
  diagnostic: null,
  response: "Knowledge work is changing because AI can generate drafts, analyse information, and automate routine tasks. However, organisations still need people to define goals, interpret context, make trade-offs, and take accountability. Learn where AI creates leverage in your field. The highest-value professionals will combine human judgement with AI-assisted productivity.",
  suggestions: ["Which knowledge jobs are changing fastest?", "How do I stay relevant?", "Should I learn prompting?"],
  radarLink: null
},
{
  id: 139,
  category: "AI and job security concerns",
  triggers: ["ai project management", "project manager ai", "ai and pm role"],
  diagnostic: null,
  response: "AI is likely to automate parts of project administration, reporting, scheduling, and documentation. Project managers who focus only on coordination may face pressure. Those who excel at stakeholder alignment, risk management, prioritisation, influence, and strategic execution will remain valuable. Use AI to reduce administrative burden and spend more time on leadership activities.",
  suggestions: ["Will project managers be replaced?", "How should PMs use AI?", "What skills matter most?"],
  radarLink: { label: "Explore Program Management career ladder", path: "program_management" }
},
{
  id: 140,
  category: "AI and job security concerns",
  triggers: ["ai software engineering", "ai coding", "developers and ai"],
  diagnostic: null,
  response: "AI can generate code, explain systems, and accelerate development. However, software engineering remains much broader than writing code. Architecture, requirements, security, trade-offs, debugging, stakeholder communication, and system design still require human judgement. Strong engineers will increasingly use AI as a productivity multiplier rather than viewing it solely as a competitor.",
  suggestions: ["Will developers still be needed?", "How should engineers use AI?", "What engineering skills are future-proof?"],
  radarLink: { label: "Explore Software Engineering career ladder", path: "software_engineering" }
},
{
  id: 141,
  category: "AI and job security concerns",
  triggers: ["ai analysts", "data analyst ai", "analytics and ai"],
  diagnostic: null,
  response: "AI can automate parts of data preparation, visualisation, and reporting. Analysts who only produce reports may face pressure. Analysts who frame business questions, interpret findings, challenge assumptions, and influence decisions will remain valuable. The future analyst is likely to spend less time producing information and more time creating insight.",
  suggestions: ["Should analysts learn AI?", "What skills matter most?", "Will reporting be automated?"],
  radarLink: { label: "Explore Data Analytics career ladder", path: "data_analytics" }
},
{
  id: 142,
  category: "AI and job security concerns",
  triggers: ["future proof career", "future proof my job", "career resilience"],
  diagnostic: null,
  response: "Future-proofing a career is less about predicting the future and more about building adaptability. Develop transferable skills, maintain a strong network, learn continuously, and stay aware of industry trends. Careers become resilient when people can move between opportunities rather than depend on one role, employer, or technology.",
  suggestions: ["What skills are most transferable?", "How often should I reskill?", "How do I stay adaptable?"],
  radarLink: null
},
{
  id: 143,
  category: "AI and job security concerns",
  triggers: ["learn ai non technical", "ai for beginners", "ai without coding"],
  diagnostic: null,
  response: "Non-technical professionals do not need to become machine learning engineers to benefit from AI. Start by understanding practical applications in your field. Experiment with AI tools for research, writing, analysis, planning, and productivity. Focus on solving real work problems rather than learning AI in the abstract. Practical experience builds confidence faster than theory alone.",
  suggestions: ["Where should I start?", "Do I need coding skills?", "Which AI tools should I learn?"],
  radarLink: null
},
{
  id: 144,
  category: "AI and job security concerns",
  triggers: ["ai leverage skills", "using ai at work", "ai productivity"],
  diagnostic: null,
  response: "The professionals who benefit most from AI are often those who integrate it into existing workflows. Identify repetitive tasks that consume time and test whether AI can accelerate them. Measure results. Build repeatable processes. AI leverage comes from combining domain expertise with intelligent use of tools.",
  suggestions: ["How do I use AI responsibly?", "Which tasks should I automate?", "How do I measure value?"],
  radarLink: null
},
{
  id: 145,
  category: "AI and job security concerns",
  triggers: ["lead ai adoption", "introduce ai at work", "ai transformation"],
  diagnostic: null,
  response: "Leading AI adoption requires more than enthusiasm. Start with business problems, not technology. Identify areas where AI can improve speed, quality, cost, or decision-making. Run small pilots, measure outcomes, and communicate lessons learned. Successful adoption depends on trust, governance, training, and change management as much as technical capability.",
  suggestions: ["How do I build an AI business case?", "How do I manage resistance?", "What should I pilot first?"],
  radarLink: null
},
{
  id: 146,
  category: "AI and job security concerns",
  triggers: ["ai resistant skills", "skills ai can't replace", "human skills"],
  diagnostic: null,
  response: "The most durable skills are those that combine judgement, relationships, ethics, creativity, and accountability. Negotiation, leadership, coaching, stakeholder management, strategy, influence, and complex decision-making remain difficult to automate fully. Focus on becoming excellent where technology complements rather than replaces human capability.",
  suggestions: ["Which human skills matter most?", "How do I develop judgement?", "Can creativity be automated?"],
  radarLink: null
},
{
  id: 147,
  category: "Career plateau",
  triggers: ["career plateau", "stuck in career", "not progressing", "career stalled"],
  diagnostic: null,
  response: "A career plateau is often a signal that your current environment no longer stretches your capability. Assess whether the constraint is skill, visibility, opportunity, or motivation. Then create deliberate growth opportunities through projects, mentoring, networking, or role changes. Progress usually resumes when challenge returns.",
  suggestions: ["How do I identify what's holding me back?", "Should I change jobs?", "How do I regain momentum?"],
  radarLink: null
},
{
  id: 148,
  category: "Executive presence",
  triggers: ["executive presence", "senior presence", "leadership presence"],
  diagnostic: null,
  response: "Executive presence is not charisma. It is the ability to create confidence in your judgement. Communicate clearly, stay calm under pressure, understand business context, and focus on decisions rather than details. Presence grows when people trust your thinking, not just your delivery.",
  suggestions: ["How do I develop executive presence?", "What behaviours matter most?", "How do I communicate like a leader?"],
  radarLink: null
},
{
  id: 149,
  category: "Building a succession plan",
  triggers: ["succession planning", "successor", "replace myself", "future leader"],
  diagnostic: null,
  response: "Succession planning is about reducing organisational risk. Identify critical responsibilities, document knowledge, and develop people who can assume greater responsibility. Strong leaders create capability beyond themselves. A good succession plan benefits both the organisation and your own progression.",
  suggestions: ["How do I identify successors?", "What should I document?", "How do I develop future leaders?"],
  radarLink: null
},
{
  id: 150,
  category: "High-potential employee strategy",
  triggers: ["high potential", "hipo", "future leader", "career acceleration"],
  diagnostic: null,
  response: "High-potential employees are typically recognised not only for performance but for learning speed, adaptability, and influence. Seek stretch assignments, build broad relationships, and ask for honest feedback. The fastest career growth often comes from solving difficult problems that others avoid.",
  suggestions: ["How do I know if I'm high potential?", "What opportunities should I seek?", "How do I accelerate growth?"],
  radarLink: null
},
{
  id: 151,
  category: "Managing a career setback",
  triggers: ["career setback", "missed opportunity", "career disappointment"],
  diagnostic: null,
  response: "Career setbacks become valuable when they are analysed rather than personalised. Review what happened, identify lessons, and create a response plan. The objective is not to erase disappointment. It is to convert experience into better future decisions.",
  suggestions: ["How do I recover?", "How do I stay motivated?", "What can I learn from this?"],
  radarLink: null
},
{
  id: 152,
  category: "Relocating internationally",
  triggers: ["move abroad for work", "international relocation", "working overseas"],
  diagnostic: null,
  response: "International relocation affects more than employment. Consider culture, legal requirements, cost of living, support networks, family implications, and long-term career value. Successful relocations are planned holistically rather than driven solely by job title or salary.",
  suggestions: ["How do I evaluate relocation?", "What should I research?", "Is the move worth it?"],
  radarLink: null
},
{
  id: 153,
  category: "Mergers and acquisitions uncertainty",
  triggers: ["merger uncertainty", "acquisition concern", "company merger"],
  diagnostic: null,
  response: "Mergers create uncertainty because structures, priorities, and roles may change. Focus on becoming valuable to the future organisation, not only the current one. Build relationships, document impact, and stay adaptable. Uncertainty rewards people who remain visible and useful.",
  suggestions: ["How do I protect my role?", "What signs should I watch?", "How do I stay relevant?"],
  radarLink: null
},
{
  id: 154,
  category: "Taking first leadership role",
  triggers: ["first manager role", "new leader", "first leadership position"],
  diagnostic: null,
  response: "Your first leadership role requires a shift from personal achievement to team achievement. Focus on communication, delegation, coaching, and clarity. Resist the urge to solve every problem yourself. Great first-time leaders create conditions for others to succeed.",
  suggestions: ["How do I lead former peers?", "What should I focus on first?", "How do I delegate effectively?"],
  radarLink: { label: "Explore Program Management career ladder", path: "program_management" }
},
{
  id: 155,
  category: "Preparing for director-level promotion",
  triggers: ["director promotion", "becoming director", "director level"],
  diagnostic: null,
  response: "Director-level roles require a shift from managing execution to shaping systems, priorities, and leaders. Build evidence of cross-functional influence, strategic thinking, organisational impact, and leadership development. Directors are expected to scale outcomes through others rather than direct involvement alone.",
  suggestions: ["What skills distinguish directors?", "How do I show strategic thinking?", "How do I prepare now?"],
  radarLink: null
},
{
  id: 156,
  category: "Preparing for VP/executive track",
  triggers: ["vp promotion", "executive career", "executive track", "senior executive"],
  diagnostic: null,
  response: "Executive careers are built on business impact, leadership leverage, and judgement. Develop deep understanding of strategy, finance, organisational design, talent development, and stakeholder influence. At this level, success is measured less by what you personally deliver and more by what the organisation achieves through your leadership.",
  suggestions: ["How do I prepare for executive roles?", "What skills matter most?", "How do I gain strategic experience?"],
  radarLink: null
},
{id:11,category:"Promotion and salary negotiation",triggers:["bonus","discretionary","performance bonus","bonus not paid","smaller bonus","bonus cut","bonus structure"],diagnostic:null,response:"Bonuses are discretionary in most organisations, which means your manager's advocacy matters as much as your performance rating. Before any bonus conversation, understand the structure: is it formula-based on targets, or fully discretionary? If formula-based, ask for the exact calculation methodology and check your numbers against it. If discretionary, the question is whether your manager went to bat for you. Have that conversation directly: 'I'd like to understand how my bonus was determined and what I can do to improve it next cycle.' If you believe you were rated unfairly, build a written case showing your outcomes against the stated criteria and request a formal review. Timing matters — make this conversation before the next performance cycle begins, not after the number lands.",suggestions:["How do I negotiate if my bonus was lower than expected?","What if my manager says the decision was made above them?","Should I ask for a higher base instead?"],radarLink:{label:"Explore Finance career ladder",path:"finance_accounting"}},

{id:12,category:"Promotion and salary negotiation",triggers:["job offer","competing offer","counter offer","another offer","received offer","offer from another company","leverage offer"],diagnostic:null,response:"Using a competing offer as leverage works — but only once, and only if you are genuinely prepared to leave. If you use it as a bluff, your manager will know. The right approach: before revealing the offer, have one direct conversation without it. Say you want to discuss your compensation and future at the company. If they are unresponsive or the answer is no, then present the offer: 'I have an offer at X. I would prefer to stay but I need to understand if this organisation can match my market value.' Be specific about what would make you stay — not just money, but title, scope, and timeline. If they counter and you accept, know that your loyalty will be quietly questioned for a period. If they do not counter, they have told you what you are worth to them. Act accordingly.",suggestions:["What if they match the offer but I still want to leave?","How long should I give them to respond?","What if I don't actually want the other job?"],radarLink:null},

{id:13,category:"Promotion and salary negotiation",triggers:["equity","shares","stock options","vesting","rsu","esop","share options","equity offer"],diagnostic:null,response:"Equity is often poorly understood and over-weighted in early career decisions. Before accepting equity as part of a package, ask six questions. One: what is the current valuation and the last round price? Two: what percentage of the company do these shares represent? Three: what is the vesting schedule and cliff? Four: what are the exercise terms if you leave? Five: are these options or restricted stock units? Six: what liquidation preference do investors have, and how does that affect your payout in an exit? For early-stage startups, assume the equity has a low probability of being worth anything material — make sure the base salary works without it. For public companies, RSUs are simpler but factor in tax implications on vesting. Never accept a materially lower base salary for equity unless you have done the analysis.",suggestions:["How do I value equity in a startup offer?","What questions should I ask before accepting options?","My vesting cliff is approaching — should I stay?"],radarLink:{label:"Explore Entrepreneurship career ladder",path:"entrepreneurship"}},

{id:14,category:"Promotion and salary negotiation",triggers:["negotiating offer","negotiate salary","job offer negotiation","how to negotiate","offer too low","push back offer","counter offer salary"],diagnostic:null,response:"Most people do not negotiate job offers. Of those who do, almost all get at least some improvement. The employer expects negotiation. When you receive an offer, do not accept or reject on the spot. Say: 'Thank you — I'm genuinely excited about this role. Can I have a few days to review the full package?' Then assess the entire offer: base, bonus structure, equity, pension, leave, flex working, title, and start date. Come back with a specific counter on the most important element and a brief justification: 'Based on my experience and market data for this level, I was expecting a base closer to X. Is there flexibility there?' Do not give a range — give a number. If they push back on salary, ask whether other elements can move: signing bonus, earlier review date, or additional leave. The worst outcome is they say no and the offer stands.",suggestions:["What if they say the offer is fixed?","How much higher should I counter?","Should I negotiate title as well as salary?"],radarLink:null},

{id:15,category:"Promotion and salary negotiation",triggers:["pay gap","gender pay gap","paid less than colleague","colleague earns more","pay disparity","unfair pay","someone junior earns more"],diagnostic:null,response:"Pay disparity is one of the most demotivating discoveries a professional can make. If you discover a colleague in a comparable role earns significantly more, your first step is to verify the information — is it directly comparable in terms of scope, seniority, tenure, and location? Once verified, do not go into the conversation from a place of grievance. Say: 'I've become aware that compensation for this level may vary across the team. I'd like to understand where I sit in the band and whether there's a plan to address any gap.' If your manager deflects, escalate to HR and ask directly for the salary band for your role. In the UK, you have the right to ask colleagues about pay and cannot be penalised for doing so. If the organisation refuses to engage with a clear disparity, document it and consider whether this is a company worth staying at.",suggestions:["What are my legal rights around pay transparency?","How do I raise this without damaging the relationship?","What if HR dismisses my concern?"],radarLink:null},

// ── CAREER TRANSITION (21-29) ──
{id:21,category:"Career transition advice",triggers:["change career","career change","switch career","different industry","leave my field","move into","transition to","pivot career","new direction"],diagnostic:null,response:"A career change is not one decision — it is a series of smaller decisions that compound. Most people overestimate how much they need to change and underestimate how transferable their existing skills are. Start by mapping what you want to keep, what you want to leave behind, and what is genuinely missing. Most career transitions are not full pivots — they are moves to an adjacent space where 70% of your skills apply and 30% need building. Identify the 30% gap and the fastest route to close it — which might be a side project, a short course, a secondment, or a voluntary role. Talk to three people already doing the job you want before committing to any retraining. The most common mistake is spending 12 months retraining for a role you have not actually validated you want.",suggestions:["How do I know if I actually want to change or just need a new environment?","What if I've been in my industry for 20 years?","How do I explain a career change in interviews?"],radarLink:{label:"Explore career paths on RADAR",path:"program_management"}},

{id:22,category:"Career transition advice",triggers:["move into tech","get into technology","tech career","technology sector","software job","tech industry","into data","data career","become a data analyst","become a developer"],diagnostic:null,response:"Technology and data careers are among the most accessible transitions for professionals from other backgrounds — largely because the sector values demonstrated skill over credentials. For data roles: SQL is non-negotiable and can be learned in 6-8 weeks with focused practice. Add Python basics and a visualisation tool (Power BI or Tableau) and you have a marketable entry-level skillset. Build a portfolio of 3-5 projects using public datasets on GitHub. For software engineering: the barrier is higher but not insurmountable. A focused bootcamp (4-6 months) or self-directed learning with a portfolio can work. The best entry point is usually a company that already knows you — an internal transfer into a junior technical role — or a technically adjacent role like business analyst, technical project manager, or data analyst that gives you proximity to engineering teams.",suggestions:["What's the fastest route into data analytics?","Do I need a computer science degree to get into tech?","Which technical skills are most in demand right now?"],radarLink:{label:"Explore Data Analytics career ladder",path:"data_analytics"}},

{id:23,category:"Career transition advice",triggers:["leave consulting","out of consulting","consulting to industry","consulting to corporate","consulting exit","post consulting","consulting exit options"],diagnostic:null,response:"Consulting exits fall into three broad categories: strategy roles in corporates, Chief of Staff or special projects roles, and operational roles where you own delivery rather than advice. Your transferable strengths are structured problem solving, stakeholder communication, and the ability to come up to speed quickly in new domains. Your perceived weaknesses are lack of implementation ownership and depth of functional expertise. Address the second directly. In your CV and interviews, lead with specific outcomes — not 'advised a client on X' but 'the programme I led delivered Y result.' Target companies where your analytical rigour is genuinely valued but where you will also have P&L or operational ownership. Strategy teams, transformation offices, and Chief of Staff roles are the most natural first landing spots.",suggestions:["How do I position consulting experience for industry roles?","What companies are best for consulting exits?","How do I explain why I'm leaving consulting?"],radarLink:{label:"Explore Program Management career ladder",path:"program_management"}},

{id:24,category:"Career transition advice",triggers:["move into management","become a manager","first management role","people manager","managing people","step up to manager","management track"],diagnostic:null,response:"The move into management is one of the most significant identity shifts in a career — you are no longer paid primarily for what you do, but for what your team delivers. The hardest part is letting go of the technical work that made you successful. Before making the move, ask yourself honestly: do I want to develop people, or do I want the status of the title? Those are different motivations with different outcomes. To build your case for a management role: start managing informally before you have the title. Mentor junior colleagues. Lead a project with people from other teams. Run meetings. When you ask for the role, show evidence that you have already been doing the job. The biggest failure mode is becoming a manager who does all the work themselves instead of enabling their team.",suggestions:["How do I know if I actually want to manage people?","What should I do in my first 90 days as a new manager?","How do I manage people who are older or more experienced than me?"],radarLink:{label:"Explore Leadership career paths on RADAR",path:"human_resources"}},

{id:25,category:"Career transition advice",triggers:["finance to technology","accountant into tech","finance career change","fmcg to tech","banking to startup","corporate to startup","big company to startup"],diagnostic:null,response:"Moving from a large corporate or financial services environment to a startup or tech company involves a genuine culture adjustment that many people underestimate. In a startup, your job title matters less than your ability to operate without structure, tolerate uncertainty, and ship things. Your corporate experience in financial discipline, stakeholder management, and process rigour is genuinely valuable — startups frequently lack these — but you need to adapt how you deploy those skills. Lead with outcomes and speed, not rigour and process. In interviews for startup roles, show that you understand the stage they are at and can operate with limited resources. The biggest risk is going to a late-stage startup or scale-up that is essentially a corporate with a tech veneer — make sure you understand what you are actually walking into.",suggestions:["How do I evaluate a startup offer vs a corporate role?","What should I look for in a startup to avoid the wrong ones?","How do I reframe my corporate experience for a startup interview?"],radarLink:{label:"Explore Entrepreneurship and Startups",path:"entrepreneurship"}},

{id:26,category:"Career transition advice",triggers:["ngo to private sector","charity to corporate","third sector to business","nonprofit to corporate","development sector exit"],diagnostic:null,response:"Moving from the NGO or development sector into the private sector is more achievable than most people think — particularly into sustainability, social impact, CSR, or consulting roles. Your transferable strengths are typically: programme management in resource-constrained environments, stakeholder management across complex multi-party landscapes, monitoring and evaluation rigour, and genuine subject matter expertise in areas private sector organisations are now taking seriously. The translation challenge is framing your experience commercially. 'Managed a $2M DFID-funded programme across 3 countries with 40 delivery partners' is a strong programme management credential — but you need to say it that way, not just list the humanitarian outcomes. Roles in corporate sustainability, international development consulting, impact investing, and social enterprise are the most natural bridges.",suggestions:["How do I translate NGO experience into private sector language?","What industries value development sector experience most?","Will taking a pay cut to go private sector be worth it?"],radarLink:{label:"Explore NGO and Development career ladder",path:"nonprofit_development"}},

{id:27,category:"Career transition advice",triggers:["change country","work abroad","move to uk","move to malaysia","move to london","relocate for work","international career","work overseas","emigrate for work"],diagnostic:null,response:"An international career move has two components that people often conflate: the professional transition and the life transition. They interact but need separate analysis. Professionally, the key questions are: is my qualification recognised in the target country, what is the visa pathway, and is my experience level portable at the same seniority? In the UK, healthcare professionals need NMC or GMC registration, engineers need CEng consideration, and lawyers need SRA conversion. For Malaysia and the Gulf, professional experience is generally more portable but local network matters enormously. Practically, job search success in a new country is heavily relationship-dependent — LinkedIn connections, diaspora communities, and recruiter relationships in the target market matter more than applying online from abroad. The RADAR country intelligence shows which sectors are actively hiring internationally in each market.",suggestions:["What visa options are available for my profession in the UK?","How do I job search in a country I'm not yet living in?","How do I negotiate relocation support into an offer?"],radarLink:{label:"Explore RADAR country intelligence",path:"program_management"}},

{id:28,category:"Career transition advice",triggers:["redundancy into new career","made redundant career change","use redundancy to change","redundancy opportunity","forced career change","layoff career pivot"],diagnostic:null,response:"Redundancy, while unwelcome, is one of the most effective catalysts for career change — because it removes the inertia of staying in a role you have been meaning to leave. The first thing to do is not panic-apply for the same type of role. Give yourself two to four weeks to map what you actually want before your job search begins. Use the redundancy package to buy thinking time. Talk to a broad range of people about what you have been genuinely good at and what you have found energising. Identify the roles or industries that have appeared in your thinking for years. Then move into structured exploration: informational conversations, skills gap assessment, and a targeted application strategy. The worst outcome of redundancy is spending 9 months finding an identical role in an identical company when you had a window to change.",suggestions:["How long should I wait before starting to apply?","How do I explain redundancy in interviews?","What if I don't know what I want to do next?"],radarLink:null},

{id:29,category:"Career transition advice",triggers:["too old","age career change","40s career change","50s career change","too late to change","career change mature","experienced career changer","worried about age"],diagnostic:null,response:"The age concern in career change is real but usually overstated. The actual barrier is not age — it is perceived risk to the employer. A 45-year-old making a career transition needs to reduce that perceived risk more actively than a 25-year-old would. That means: demonstrating that you have done the research and spoken to people in the target role, showing transferable evidence rather than just enthusiasm, and potentially accepting a lateral or slightly lower entry point to get a foot in the door before progressing quickly. Ageism does exist in some sectors — particularly early-stage startups that over-index on cultural fit — but it is much less prevalent in professional services, healthcare, education, government, and social enterprise. The strongest asset a mature career changer has is professional judgement and self-awareness, which most 25-year-olds genuinely lack.",suggestions:["Which industries are most open to mature career changers?","How do I address age concerns in interviews?","Should I hide my experience level on my CV?"],radarLink:null},

// ── JOB SEARCH (41-50) ──
{id:41,category:"Job search and interview preparation",triggers:["job search","looking for a job","finding a job","job hunting","how to find a job","job search strategy","apply for jobs","where to look for jobs"],diagnostic:null,response:"A strategic job search looks nothing like applying to every job you see on LinkedIn. The majority of roles — estimates range from 60 to 80 percent — are filled through relationships before they are advertised. Your job search strategy should reflect that. Spend 30% of your time on applications and 70% on relationships: reconnecting with former colleagues, having informational conversations with people in target companies, attending industry events, and asking people in your network for specific introductions. For applications, quality beats volume — a targeted, tailored application to 10 relevant roles will outperform 100 generic ones. Set up precise job alerts, follow target companies directly, and build a relationship with two or three specialist recruiters in your field. Track everything in a simple spreadsheet: company, role, contact, status, next action.",suggestions:["How do I use LinkedIn effectively in my job search?","How long should a job search realistically take?","Should I use a recruiter or apply directly?"],radarLink:null},

{id:42,category:"Job search and interview preparation",triggers:["cv","resume","cv writing","improve my cv","cv advice","cv tips","what to put on cv","cv format","cv review"],diagnostic:null,response:"A strong CV has one job: get you an interview. It does that by making it immediately obvious that you have done the relevant work at the relevant level. Structure: contact details, a 3-line professional summary, experience in reverse chronological order, education, and key skills. Each role should have 3-5 bullet points starting with an active verb and ideally including a quantified outcome: 'Led a cross-functional programme of 12 people, delivering a £2M system migration 3 weeks ahead of schedule.' Avoid job description language — describe impact, not responsibilities. Length: two pages maximum for most professionals; one page if under 5 years' experience. Format: clean, no tables, no graphics, ATS-readable. Tailor the summary and top bullet points for each application — a generic CV is immediately visible to a hiring manager.",suggestions:["How do I write a CV if I have gaps?","How do I show impact if my role was not commercial?","Should I include a photo on my CV?"],radarLink:null},

{id:43,category:"Job search and interview preparation",triggers:["interview preparation","prepare for interview","interview tips","interview advice","job interview","how to interview","interview nerves","nervous about interview"],diagnostic:null,response:"Interview preparation has two layers: content and delivery. Content means having 6-8 structured stories ready that demonstrate your key strengths — using a simple format: situation, what you did, and the result. Cover: a major achievement with numbers, a time you led through ambiguity, a difficult stakeholder situation you resolved, a failure you learned from, and why you want this specific role. Delivery means practising out loud — not in your head. Record yourself answering questions and watch it back. Know the company deeply: recent news, strategy, competitors, and how the role fits their direction. Prepare 3 smart questions for the end — not about salary or holidays, but about the team's challenges, what success looks like in 12 months, and what the interviewer's own experience of the company has been.",suggestions:["How do I answer 'tell me about yourself'?","What are the most common interview questions I should prepare?","How do I recover from a question I don't know the answer to?"],radarLink:null},

{id:44,category:"Job search and interview preparation",triggers:["linkedin","linkedin profile","linkedin tips","linkedin headline","linkedin summary","optimize linkedin","linkedin strategy","found on linkedin","recruiter found me"],diagnostic:null,response:"LinkedIn is now the primary sourcing tool for most professional recruiters. An optimised profile means: a headline that describes your expertise and value, not just your job title; an About section written in first person that explains what you do, who you do it for, and what makes you effective — 3-5 short paragraphs; experience entries with bullet points showing outcomes, not just duties; a current photo (profiles with photos get significantly more views); skills section with at least 10 relevant skills; and recommendations from managers and colleagues. To get found, turn on Open to Work (visible to recruiters only if you prefer discretion), connect with recruiters in your sector, and post or comment in your field occasionally — even a monthly insightful comment puts you in the algorithm. The most overlooked move is proactively messaging target company employees for informational conversations rather than waiting to apply.",suggestions:["Should I tell my current employer I'm looking?","How do I write a strong LinkedIn headline?","How do I approach someone on LinkedIn for an informational chat?"],radarLink:null},

{id:45,category:"Job search and interview preparation",triggers:["cover letter","covering letter","do I need a cover letter","cover letter tips","how to write cover letter","covering letter advice"],diagnostic:null,response:"A cover letter, when read, is your chance to show that you understand the specific role and company — not just that you have the right background. Most cover letters fail because they summarise the CV rather than adding to it. The structure that works: one sentence on why this specific organisation, one sentence on what you bring that is directly relevant to the specific challenge or role they have described, two or three bullet points of your most relevant evidence, and a closing line expressing genuine interest and a call to action. Keep it to one page — ideally half a page. The most important thing is specificity: show that you have read the job description carefully and thought about why your experience is relevant to their situation. Generic cover letters are instantly visible and usually ignored.",suggestions:["How do I write a cover letter for a career change?","What if the job description doesn't say much?","Should I always send a cover letter even if not required?"],radarLink:null},

{id:46,category:"Job search and interview preparation",triggers:["salary expectation","expected salary","what salary to ask","salary question interview","how much to say","salary range interview","what to say about salary"],diagnostic:null,response:"The salary question in an interview is best handled by deflecting initially and anchoring late. Early in the process, respond with: 'I'd like to learn more about the full role and scope before discussing a number — but I'm flexible for the right opportunity.' If pushed for a number before you have enough information, give a range based on market data with your target at the bottom of the range, not the top. Once you have an offer, you negotiate — that is the right moment for the real conversation. Never give a number so low that you regret it for years, and never give one so high that you screen yourself out before they have met you. Research the market rate for the specific role, level, location, and industry before any interview so you are never caught without data.",suggestions:["What if they ask for my current salary?","How do I handle a lowball offer?","Should I give a range or a specific number?"],radarLink:null},

{id:47,category:"Job search and interview preparation",triggers:["rejected","application rejected","interview rejected","not getting interviews","no response","ghosted application","rejection after interview","why am I not getting interviews"],diagnostic:null,response:"Consistent rejection in a job search is almost always a signal problem, not a quality problem. Start by diagnosing where in the funnel you are losing. No response to applications usually means your CV is not clearing the first screen — check it against the job description language and tighten the match. Getting interviews but not progressing past round one usually means your opening answers are not landing — work on your 'tell me about yourself' and your first story. Getting to final stages but not converting usually means the interviewer has a concern they did not voice — you need to proactively address potential objections about experience gaps or career change. Also check: are you applying to the right level? Are you targeting companies where your background is genuinely valued? Is your LinkedIn profile consistent with your CV?",suggestions:["How do I ask for feedback after a rejection?","Should I apply for roles I'm underqualified for?","How do I keep motivated during a long job search?"],radarLink:null},

{id:48,category:"Job search and interview preparation",triggers:["interview question","behavioural interview","competency interview","star method","how to answer interview questions","tell me about a time","give me an example"],diagnostic:null,response:"Behavioural interview questions — 'tell me about a time when...' — are the core format for most professional interviews. The most effective structure is not STAR (which often produces long, unfocused answers) but a tighter version: context in one sentence, your specific actions in two to three sentences, and the outcome — with a number wherever possible. The most common mistake is spending too long on the situation and not long enough on what you personally did. Use 'I' not 'we' — the interviewer wants to know your contribution. Prepare 6-8 stories in advance and practise adapting them to different question angles. A good story about leading through uncertainty can answer questions about leadership, ambiguity, stakeholder management, and conflict resolution depending on how you frame it.",suggestions:["What are the most common behavioural questions I should prepare?","How do I answer questions about failure or weaknesses?","How long should my answers be?"],radarLink:null},

{id:49,category:"Job search and interview preparation",triggers:["internal application","apply internally","internal job","internal promotion","apply for internal role","internal move","lateral internal move"],diagnostic:null,response:"An internal job application is different from an external one in important ways. Your reputation and relationships in the building are your biggest asset — and your biggest liability if you have not managed them well. Before applying, have a direct conversation with your current manager: tell them you are interested in the role and you want their support. Doing this after the fact damages trust and is usually discovered anyway. In the interview, you will be held to a higher standard — the panel knows your track record and will probe any perceived gaps. Do not assume familiarity will carry you; prepare as rigorously as you would for an external process. Show that you understand the new role's challenges specifically, not just that you want a change. If you do not get the role, have an honest debrief conversation immediately — and decide whether you can continue in your current role positively.",suggestions:["How do I tell my current manager I'm applying for an internal role?","What if I don't get the internal job?","How do I compete with external candidates?"],radarLink:null},

{id:50,category:"Job search and interview preparation",triggers:["references","reference check","reference letter","who to use as reference","reference advice","bad reference","reference preparation"],diagnostic:null,response:"References are most impactful when they are prepared rather than surprised. Before listing someone, call them and have a specific conversation: explain the role you are applying for, the key competencies being assessed, and one or two things you would love them to emphasise. Ask if they are comfortable giving you a strong reference — that question alone tells you whether to use them. The strongest references are direct managers who saw your work consistently, particularly on high-stakes projects. Avoid using colleagues at the same level unless you have no other option. If you are worried about a reference from a difficult manager, think about whether there is a skip-level manager, a senior stakeholder, or a client who saw your work more favourably. Never list a reference contact before asking them — it is a basic professional courtesy that is regularly ignored.",suggestions:["What if I left my last job on bad terms?","Can I use a colleague instead of a manager as a reference?","What do employers actually ask in a reference check?"],radarLink:null},

// ── WORKPLACE CONFLICT & POLITICS (71-90) ──
{id:71,category:"Workplace conflict and politics",triggers:["office politics","workplace politics","political environment","navigating politics","how to deal with politics","toxic politics","political games","playing politics"],diagnostic:null,response:"Office politics is not optional — it is the informal system by which resources, recognition, and opportunities get allocated. Refusing to engage does not make you immune; it makes you invisible in decisions that affect you. The distinction worth making is between political behaviour that builds genuine value (building relationships, understanding agendas, communicating your impact) and political behaviour that tears others down (credit-grabbing, undermining, coalition-building against a person). The first is essential professional skills. The second is both unethical and usually self-defeating. To navigate a political environment effectively: map who has influence and what they care about, build authentic relationships with key stakeholders before you need something, make your work visible without being self-promotional, and understand the unstated objectives behind every major decision.",suggestions:["How do I build influence without being seen as political?","What do I do if someone is actively undermining me?","How do I handle a political bully at work?"],radarLink:null},

{id:72,category:"Workplace conflict and politics",triggers:["colleague conflict","conflict with colleague","disagreement at work","argument with coworker","colleague problem","issue with teammate","team conflict","personality clash"],diagnostic:{questions:[{text:"What is the nature of the conflict?",options:["Professional disagreement about approach or priorities","Personal friction or communication style","They did something that directly harmed my work or reputation","Ongoing pattern of difficult behaviour","One-off incident that escalated"]},{text:"How long has this been going on?",options:["Just happened","A few weeks","Several months","Over a year"]}]},diagnosticResponses:{"Professional disagreement about approach or priorities":"Professional disagreements are healthy when handled well. Separate the idea from the person — attack the problem, not their position. Ask for a direct one-to-one conversation rather than letting it play out in group settings. Lead with curiosity: 'Help me understand your reasoning on this' before presenting your counter-view. If you cannot reach alignment, escalate the decision to your manager framed as a business question, not an interpersonal dispute. Most professional disagreements look much smaller six months later.","Personal friction or communication style":"Communication style clashes are common and rarely malicious. Start by identifying your own triggers — what specifically does this person do that bothers you, and why? Then adapt rather than waiting for them to change. If they are direct and you prefer diplomacy, meet them halfway. If they need more context than you typically give, build that in. A brief direct conversation framing it as 'I want us to work well together — I've noticed we sometimes miscommunicate and I'd like to figure out how to fix that' can dissolve months of tension.","They did something that directly harmed my work or reputation":"This needs a direct conversation, not a passive response. Request a private meeting and be specific: 'In the meeting on Tuesday, you attributed the project delays to my team without mentioning the context. I'd like to understand why and agree how we handle this going forward.' Keep it factual and future-focused. If the behaviour repeats, document it and involve your manager. One incident can be a misunderstanding. A pattern is a problem.","Ongoing pattern of difficult behaviour":"A pattern of difficult behaviour needs to be named. Have one clear, direct conversation where you describe the pattern specifically — not 'you always' but 'on these three occasions, this happened.' State the impact on your work and relationships. Give them the opportunity to respond. If nothing changes after that conversation, involve your manager with documented examples. HR exists for patterns, not incidents.","One-off incident that escalated":"A single incident that escalated is usually recoverable. Give it 24-48 hours before acting — emotions need to settle. Then request a brief conversation: 'I wanted to clear the air after Tuesday — I think things got heated and I'd rather we address it directly.' Most colleagues will respond positively to that overture. If they do not, you have learned something about them."},suggestions:["How do I raise a conflict with my manager without seeming difficult?","What if the other person refuses to talk?","When should I involve HR?"],radarLink:null},

{id:73,category:"Workplace conflict and politics",triggers:["bullying","being bullied","workplace bullying","bully at work","intimidation","aggressive manager","aggressive colleague","hostile work environment","harassment"],diagnostic:null,response:"Workplace bullying is persistent behaviour that humiliates, intimidates, or undermines a person — and it should never be tolerated or normalised. The first step is documentation. Keep a private, factual log of every incident: date, time, location, exactly what was said or done, any witnesses. Do not rely on memory. Once you have three or more documented incidents showing a pattern, you have grounds for a formal complaint. Before escalating formally, consider whether a direct conversation with the person is safe and appropriate — sometimes naming the behaviour clearly stops it. If not, speak to your manager (if they are not the bully), HR, or a trusted senior colleague. In the UK, you have legal protections under employment law, and most organisations have formal grievance procedures. If the organisation fails to act, an Employment Tribunal is an option.",suggestions:["What's the difference between bullying and a demanding manager?","How do I document incidents properly?","What if HR takes the bully's side?"],radarLink:null},

{id:74,category:"Workplace conflict and politics",triggers:["team not performing","team issues","underperforming team","inherit bad team","managing poor performers","team morale","team culture problem","fixing a team"],diagnostic:null,response:"Taking over an underperforming team or inheriting poor team culture is one of the most common leadership challenges. The first 30 days are diagnostic, not corrective — resist the urge to change things immediately. Have individual one-to-ones with every team member: ask what is working, what is not, what they need to do their best work, and what they think is holding the team back. Look for the root causes of underperformance: is it capability, motivation, unclear expectations, poor processes, or a structural problem? Then act with precision. Capability gaps need development plans or role redesign. Motivation problems need honest conversations about expectations and consequences. Poor processes need fixing, not people. If there are clear poor performers who have been left unmanaged, begin performance management early with clear, documented expectations.",suggestions:["How do I have a performance conversation with a long-standing employee?","What do I do if the team resists my leadership?","How do I rebuild trust after previous leadership failures?"],radarLink:{label:"Explore Leadership career paths",path:"human_resources"}},

{id:75,category:"Workplace conflict and politics",triggers:["taking credit","credit stolen","someone taking credit","boss takes credit","colleague takes credit","not getting credit","recognition","work not recognised"],diagnostic:null,response:"Credit being taken for your work is one of the most frustrating experiences in professional life — and addressing it requires building visibility structures, not just having a conversation after the fact. Proactively: document your contributions in writing before presentations. Send email summaries after key decisions. Speak up in meetings: 'Building on the approach I shared with the team last week...' or 'As I mentioned in my note to [manager]...' Reactively, if a specific incident occurs, have a calm, private conversation: 'In the meeting, my contribution to the analysis wasn't mentioned — I'd appreciate it if you could attribute the work accurately going forward.' If it is your manager doing this, the conversation is harder but essential: frame it as wanting to ensure your development is visible to senior stakeholders.",suggestions:["How do I document my contributions without seeming paranoid?","What if my manager takes credit routinely?","How do I raise this in a performance review?"],radarLink:null},

{id:76,category:"Workplace conflict and politics",triggers:["excluded","being excluded","left out","not included","excluded from meetings","excluded from decisions","marginalised","sidelined","deliberately excluded"],diagnostic:null,response:"Feeling excluded can be a misread of a busy organisation, or it can be a genuine signal that your position is being eroded. The distinction matters. First, test the assumption: are other people at your level also excluded, or specifically you? Is there a pattern across time, or recent? Once you have a clearer picture, act directly. Ask your manager: 'I've noticed I'm not included in the [specific meeting or decision]. I want to make sure I understand whether my role in this area has changed.' That question, calmly asked, will almost always produce a useful response — either a legitimate explanation or an acknowledgement that the exclusion was intentional. If you are being deliberately marginalised, name it: 'I want to be direct — I feel my involvement has reduced and I want to understand if there's something I should address.'",suggestions:["How do I re-insert myself into important conversations?","What if it's my manager who is excluding me?","Could this be a sign I'm being managed out?"],radarLink:null},

{id:77,category:"Workplace conflict and politics",triggers:["being managed out","pushed out","forced out","company wants me to leave","managed out","constructive dismissal","feeling forced to resign","job at risk"],diagnostic:null,response:"Being managed out is a deliberate process where an organisation creates conditions that make it uncomfortable to stay, without technically dismissing you. The signs are: sudden increase in performance management, exclusion from meetings and communications, role being quietly reduced, being given impossible targets, micromanagement after independence, or a pattern of criticism that did not exist before. If you recognise this pattern, do two things simultaneously. First, get everything in writing — requests, feedback, performance conversations. Verbal communications become 'never happened' very quickly. Second, seek legal advice — in the UK, constructive dismissal is a legal claim if your employer has made your working conditions intolerable. You do not need to resign immediately to build your case. Continue to perform professionally while documenting everything and actively exploring your next move.",suggestions:["What are my legal rights if I'm being managed out?","Should I resign or wait to be dismissed?","How do I negotiate an exit package?"],radarLink:null},

{id:78,category:"Workplace conflict and politics",triggers:["whistle blowing","whistleblower","report misconduct","raise concerns","raising concerns","speak up","ethical concern","malpractice","fraud at work","illegal activity at work"],diagnostic:null,response:"Raising concerns about misconduct, fraud, or illegal activity is one of the most serious professional decisions a person can make. In the UK, whistleblowers who report in the public interest have legal protections under the Public Interest Disclosure Act — but these protections are strongest when you have followed the right process. First, distinguish between an ethical disagreement (which is important but not legally protected) and genuine wrongdoing: fraud, illegality, health and safety breaches, environmental damage, or cover-ups. Document everything before you act. Report through the appropriate internal channel first — usually HR, the board, or a designated whistleblowing hotline. If internal reporting is not safe or has been ignored, external routes include the FCA for financial misconduct, HMRC for tax fraud, or the CQC for healthcare. Seek legal advice before making any external report.",suggestions:["Am I protected if I report internally and nothing happens?","What if I'm worried about retaliation?","How do I report anonymously?"],radarLink:null},

{id:79,category:"Workplace conflict and politics",triggers:["micromanagement","micromanaged","boss doesn't trust me","too much oversight","lack of autonomy","no trust from manager","manager checks everything","hovering manager"],diagnostic:null,response:"Micromanagement is almost always driven by anxiety or previous bad experience — rarely by a genuine assessment that you cannot be trusted. The fastest way to reduce it is to make your manager's anxiety unnecessary. Send a brief weekly update before they ask for it: what you completed, what you are working on, any blockers. This removes the uncertainty that drives checking behaviour. In your one-to-ones, proactively share decisions you have made and your reasoning — before outcomes are known, not after. After four to six weeks of this approach, have a direct conversation: 'I want to make sure I'm working in a way that gives you confidence. Is there anything about my approach you'd like to see differently?' If the micromanagement continues despite this, it is a management style problem, not a trust problem — and that is a different conversation about whether this relationship is workable.",suggestions:["How do I push back on micromanagement without seeming defensive?","What if my manager has genuinely lost confidence in me?","Should I raise this with HR or a skip-level manager?"],radarLink:null},

{id:80,category:"Workplace conflict and politics",triggers:["unfair treatment","treated unfairly","discrimination","bias","treated differently","favouritism","double standards","not treated equally","unfair management"],diagnostic:{questions:[{text:"What kind of unfair treatment are you experiencing?",options:["Favouritism — others get opportunities I don't","Discrimination based on a protected characteristic","Different rules applied to different people","Not recognised or rewarded fairly despite performance","Being held to higher standards than colleagues"]},{text:"Have you raised this with anyone?",options:["No — not yet","Yes — informally with manager","Yes — formally with HR","Yes — and nothing changed"]}]},diagnosticResponses:{"Favouritism — others get opportunities I don't":"Favouritism is real and demoralising. Tackle it by making your interest in opportunities explicit and on the record: tell your manager directly which opportunities you want and why you are qualified. When you are passed over, ask specifically why another person was selected and what you would need to demonstrate to be considered next time. Document these conversations. Patterns of unexplained favouritism may be grounds for a formal grievance, particularly if they correlate with protected characteristics.","Discrimination based on a protected characteristic":"If you believe you are being treated differently because of a protected characteristic — age, gender, race, disability, religion, sexual orientation, or others — you have legal protections under the Equality Act 2010 in the UK. Keep a precise record of incidents with dates. Raise a formal grievance through HR. If the organisation does not investigate adequately, the Employment Tribunal is an option. Seek independent legal advice before deciding how to proceed — many employment lawyers offer free initial consultations.","Different rules applied to different people":"Inconsistent rule application is one of the most corrosive management behaviours. If you have specific examples, name them directly to your manager: 'I noticed that the policy on [X] was applied differently in my case versus [Y situation]. I'd like to understand the reasoning.' If the inconsistency is systematic, document it and raise it formally.","Not recognised or rewarded fairly despite performance":"Start with a direct conversation with your manager about how performance is measured and how decisions about recognition and reward are made. Ask explicitly where you sit in the assessment and what the specific criteria are for higher recognition. If the answer is unsatisfying, ask whether there is a formal calibration or moderation process you can participate in or understand.","Being held to higher standards than colleagues":"Being held to a higher standard than your peers, without recognition, is exhausting. Raise it directly: 'I've noticed that the expectations on my work seem to differ from others at my level. I'd like to understand if that's intentional and how it relates to my progression.' Sometimes this is actually investment in you — high standards can mean high expectations of your potential. More often it is unclear or unfair management, and naming it is the only way to find out."},suggestions:["How do I raise this formally without damaging my position?","What evidence do I need before going to HR?","Should I speak to an employment lawyer?"],radarLink:null},

// Continue workplace conflict
{id:81,category:"Workplace conflict and politics",triggers:["cliques","clique at work","excluded from group","social exclusion work","social groups work","not fitting in","outsider at work","not part of the group"],diagnostic:null,response:"Social exclusion in a professional setting is uncomfortable but often not malicious — teams develop social patterns and it takes active effort to include newcomers. If you are new, give it 90 days before concluding the exclusion is deliberate. Invest in one-on-one relationships rather than trying to break into existing groups — have coffee or a brief chat with individual colleagues, show genuine interest in their work, and find shared professional interests. If the exclusion is clearly deliberate and affecting your work — not being included in relevant conversations, left out of lunches where work is discussed — raise it with your manager as a work effectiveness issue, not a social one. If it is accompanied by other exclusionary behaviour, it may constitute bullying.",suggestions:["How do I build relationships with a resistant team?","What if the group is centred around my manager?","How do I raise social exclusion professionally?"],radarLink:null},

{id:82,category:"Workplace conflict and politics",triggers:["redundancy","being made redundant","lose my job","layoff","company restructure","job cut","role eliminated","reorg","restructuring"],diagnostic:{questions:[{text:"What is your current situation?",options:["Just been told I'm at risk","Formal redundancy process has started","Already confirmed redundant","Worried I might be next but not told yet"]},{text:"How long have you been with the organisation?",options:["Under 2 years","2-5 years","5-10 years","Over 10 years"]}]},diagnosticResponses:{"Just been told I'm at risk":"Being put at risk of redundancy triggers a formal consultation process in the UK — typically a minimum of 45 days for large-scale redundancies. You have the right to understand the selection criteria, to see how you scored against them, to propose alternatives to redundancy, and to appeal the decision. Do not sign anything immediately. Get the selection criteria in writing and request a one-to-one to understand your score before the process concludes. Use this time to update your CV, speak to recruiters, and activate your network — not to wait for the outcome.","Formal redundancy process has started":"The formal process has specific legal rights attached to it. You are entitled to a minimum statutory redundancy payment based on age and length of service — check your contract for any enhanced entitlement. You have the right to appeal. You are also entitled to reasonable paid time off to look for new employment during your notice period. Review your settlement agreement carefully — if you are being asked to sign one, seek independent legal advice first. Most settlement agreements include a legal advice clause and your employer will usually pay for this.","Already confirmed redundant":"Your focus now is twofold: ensure you receive everything you are entitled to, and move quickly on your next opportunity. Confirm your statutory redundancy pay, outstanding holiday, and notice period in writing. If you have been asked to sign a settlement agreement, get it reviewed by an employment solicitor before signing — it waives your right to bring future claims. On the job search: redundancy carries zero stigma in a job search. You have been selected by circumstances, not performance, and most hiring managers understand this.","Worried I might be next but not told yet":"If restructuring is happening around you and you are worried, the best move is to make yourself as visible and valuable as possible in the near term — take on high-visibility work, strengthen your relationships with decision-makers, and make sure your contributions are clearly attributed. Simultaneously, update your CV and reconnect with your network now, before any announcement. Finding yourself caught unprepared is the worst outcome."},suggestions:["What are my legal rights during redundancy?","How do I negotiate a better redundancy package?","How do I explain redundancy to future employers?"],radarLink:null},

{id:83,category:"Workplace conflict and politics",triggers:["gossip","rumours","office gossip","workplace rumours","spreading rumours","rumour about me","gossip at work","backstabbing"],diagnostic:null,response:"Gossip and rumours in a workplace spread fastest into a vacuum — when people do not have accurate information, they fill the gap with speculation. If rumours are circulating about you specifically, the most effective response is usually to address them directly with the person closest to the source, rather than trying to counter-campaign. A calm, factual conversation — 'I heard there's been some speculation about X. The actual situation is Y.' — is more effective than ignoring it or escalating it. If the gossip is malicious and affecting your professional reputation, document it and raise it formally as conduct issue. If you are being asked to participate in gossip about others, the simplest and most professionally safe response is: 'I'm not really close enough to the situation to comment.'",suggestions:["How do I find out who started a rumour?","What if my manager is gossiping about me?","How do I address gossip without seeming defensive?"],radarLink:null},

{id:84,category:"Workplace conflict and politics",triggers:["gaslighting","reality questioned","made to feel crazy","doubting myself","told it didn't happen","my perceptions questioned","made to question myself","emotional manipulation work"],diagnostic:null,response:"Gaslighting in a workplace context — having your perceptions, memory, or judgement consistently questioned by a colleague or manager — is a form of psychological manipulation that is genuinely harmful. The most effective tool against it is documentation. After every significant conversation, send a brief email summary: 'Following our conversation today, I want to confirm we agreed X.' This creates a contemporaneous record that cannot be rewritten later. Trust your own perceptions — if you noticed something, you noticed it. Talk to a trusted colleague who can offer an independent view of the situation. If the behaviour is coming from your manager, it will likely escalate — begin your exit planning while simultaneously documenting and reporting it. This is not a situation that improves with time.",suggestions:["How do I know if I'm being gaslighted or just in a difficult environment?","What should I document and how?","When does this cross into formal misconduct?"],radarLink:null},

{id:85,category:"Workplace conflict and politics",triggers:["skip level","go around my manager","escalate over manager","talk to manager's manager","skip level meeting","bypass manager","go above manager's head"],diagnostic:null,response:"Going above your manager's head is high-risk and should be done strategically, not emotionally. Before doing it, ask yourself: have you tried to resolve this directly with your manager first, and is there a legitimate organisational reason to involve their manager? The scenarios where it is appropriate: your manager has a conflict of interest in the decision, the issue involves your manager's conduct, or you have exhausted the normal channel and the issue materially affects your work or wellbeing. When you do escalate, be factual and solution-focused: 'I've raised this with [manager] on three occasions and I'm concerned it hasn't been resolved. I'd appreciate your view on how to handle it.' Avoid positioning it as a complaint against your manager unless it genuinely is — frame it as seeking guidance on a business problem. Your manager will almost certainly find out, so be prepared for that conversation.",suggestions:["How do I escalate without destroying my relationship with my manager?","What if the skip-level manager is also part of the problem?","Should I tell my manager I'm going to their manager first?"],radarLink:null},

{id:86,category:"Workplace conflict and politics",triggers:["new manager","manager changed","different manager","manager leaving","new boss","inherited by new manager","management change","reporting to new person"],diagnostic:null,response:"A change in manager is a significant professional event that is best treated proactively rather than reactively. The incoming manager does not know your track record, your working style, or your value — you need to establish all three early. Request an early one-to-one and come prepared: a brief summary of what you own, what you have delivered recently, and what you are working on. Ask them about their priorities, how they like to receive information, and what good looks like to them. Do not assume the way things worked with your previous manager will continue — ask explicitly. Build the relationship on honesty rather than impression management; new managers quickly identify the people who show them only good news. Offer to support the transition and be a stable point of continuity for the team.",suggestions:["My new manager seems to be favouring others — what do I do?","What if my new manager is younger or less experienced than me?","My previous manager was great — how do I manage the change?"],radarLink:null},

{id:87,category:"Workplace conflict and politics",triggers:["peer competition","competing with colleague","colleague is competing with me","rivalry at work","colleague going for same promotion","competitive colleague","undermining competition"],diagnostic:null,response:"Peer competition for the same promotion or opportunity is natural and manageable when both parties behave professionally. The mistake most people make is treating it as a zero-sum contest and playing defensive. The better strategy is to focus entirely on your own performance and visibility rather than monitoring or undermining your competitor. In most organisations, the decision-maker is looking for the candidate who consistently demonstrates the right behaviours — not the one who outmanoeuvred the other. If your colleague is actively undermining you to improve their chances, document specific incidents and raise them with your manager as conduct issues. Informal coalitions, political maneuvering, and reputation damage are real — name them when they happen rather than absorbing them silently.",suggestions:["Should I mention my colleague's behaviour to the decision-maker?","How do I maintain a working relationship if we're competing?","What if my colleague gets the role and I have to work for them?"],radarLink:null},

{id:88,category:"Workplace conflict and politics",triggers:["resignation","handing in notice","how to resign","leaving job","notice period","resign professionally","how to leave","handing in my notice","quit job"],diagnostic:null,response:"Resignation is one of the most visible professional moments of your career — how you leave matters as much as why you leave. Give your notice in a private meeting with your manager before any announcement — do not tell colleagues first. Keep your resignation conversation brief and professional: thank them for the opportunity, state your notice period, and offer to support a smooth handover. Your resignation letter should be two sentences: notice and last day. Do not include reasons, grievances, or future plans unless you genuinely want to maintain the relationship. During your notice period, deliver professionally — do not coast. Complete what you can, document your work thoroughly, and hand over your responsibilities with care. The professional world is smaller than it seems; your reputation travels with you.",suggestions:["How do I resign when I have a counter-offer?","What do I owe my employer during my notice period?","How do I handle colleagues asking why I'm leaving?"],radarLink:null},

{id:89,category:"Workplace conflict and politics",triggers:["notice period","garden leave","working notice","notice period negotiation","reduce notice period","leave early notice","buy out notice","negotiate notice"],diagnostic:null,response:"Notice periods are contractual, but they are regularly negotiated in practice. If you want to leave earlier than your notice period allows, the cleanest route is to ask directly — many employers will agree to an early exit, particularly if your role can be covered or you are being replaced quickly. Be prepared to offer a clean, professional handover as part of the negotiation. If they insist on the full period, you have two options: work it professionally and use the time productively, or negotiate a payment in lieu of notice (PILON) if your contract allows it. Garden leave — being paid to not work — is typically reserved for senior roles with access to sensitive information. Do not simply stop working without agreement; it constitutes a breach of contract and can affect references and any restrictive covenants.",suggestions:["Can my new employer start before my notice period ends?","What are restrictive covenants and are they enforceable?","How do I stay motivated during a long notice period?"],radarLink:null},

{id:90,category:"Workplace conflict and politics",triggers:["references after leaving","reference from bad employer","no reference","reference withheld","employer won't give reference","bad reference concern","factual reference","neutral reference"],diagnostic:null,response:"UK employers are not legally required to provide a reference, but most will provide a factual one covering your dates of employment, job title, and sometimes a confirmation that you left voluntarily. A genuinely damaging reference — one that is false or misleading — is actionable, but a neutral factual reference is legal even if it feels unhelpful. If you are concerned about a reference from a specific employer, have a direct conversation before listing them: ask whether they are able to provide a positive reference. If the answer is uncertain, do not list them. Use alternative references: a manager from a different organisation, a senior stakeholder who worked closely with you, or a client. If you suspect a bad reference has been given, you can request to see its content under data protection law, and take legal advice if it contains false statements.",suggestions:["Can I ask to see my own reference?","What do I do if I think I've been given a bad reference?","Can I use a colleague instead of a manager?"],radarLink:null}
];


/* ── COACH MATCHING LOGIC ──────────────────────────────────────────── */

function getCoachResponse(userMessage, profileContext = {}) {
  const msg = userMessage.toLowerCase().trim();

  // Find best matching scenario by triggers
  let bestMatch = null;
  let bestScore = 0;

  for (const scenario of COACH_SCENARIOS) {
    let score = 0;
    for (const trigger of (scenario.triggers || [])) {
      if (msg.includes(trigger.toLowerCase())) {
        // Longer trigger = more specific = higher score
        score += trigger.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = scenario;
    }
  }

  // If diagnostic scenario matched and not yet in diagnostic flow
  if (bestMatch && bestMatch.diagnostic && bestMatch.diagnosticResponses) {
    return {
      type: 'diagnostic',
      scenarioId: bestMatch.id,
      message: null,
      questions: bestMatch.diagnostic.questions,
      suggestions: bestMatch.suggestions || [],
      radarLink: bestMatch.radarLink || null
    };
  }

  // Standard text response
  if (bestMatch && bestScore > 0) {
    return {
      type: 'text',
      message: bestMatch.response,
      suggestions: bestMatch.suggestions || [],
      radarLink: bestMatch.radarLink || null,
      category: bestMatch.category
    };
  }

  // Fallback — nothing matched
  return {
    type: 'text',
    message: "I want to make sure I give you useful advice on this. Could you tell me a bit more about the specific situation? For example, what's the context, what have you tried so far, and what outcome you're looking for?",
    suggestions: [
      "How do I negotiate a promotion?",
      "I have a difficult manager — what should I do?",
      "I want to change careers — where do I start?",
      "I've been made redundant — what are my options?"
    ],
    radarLink: null,
    category: 'fallback'
  };
}

function getDiagnosticResponse(scenarioId, selectedOption) {
  const scenario = COACH_SCENARIOS.find(s => s.id === scenarioId);
  if (!scenario || !scenario.diagnosticResponses) return getCoachResponse('');

  const response = scenario.diagnosticResponses[selectedOption];
  return {
    type: 'text',
    message: response || "Based on what you've shared, here's my thinking...",
    suggestions: scenario.suggestions || [],
    radarLink: scenario.radarLink || null,
    category: scenario.category
  };
}

/* ═══ END COACH ENGINE BLOCK ══════════════════════════════════════════ */
