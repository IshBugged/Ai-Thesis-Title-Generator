// This is a mock implementation that would be replaced with an actual API call
// in a production environment. For security, we don't want to expose API keys
// in client-side code.

export const generateTitles = async (topic: string): Promise<string[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Map of topic keywords to specialized titles
  const topicKeywords: Record<string, string[]> = {
    artificial: [
      "Artificial Intelligence and Machine Learning Applications in",
      "Neural Networks for Advanced",
      "Deep Learning Approaches to",
    ],
    intelligence: [
      "Cognitive Computing Paradigms for",
      "Algorithmic Decision-Making in",
      "Smart Systems for the Future of",
    ],
    healthcare: [
      "Patient Outcomes Optimization through",
      "Clinical Decision Support Systems for",
      "Medical Diagnostics Enhancement via",
    ],
    education: [
      "Pedagogical Innovations in",
      "Learning Analytics for Improved",
      "Educational Technology Integration for",
    ],
    climate: [
      "Sustainable Solutions for",
      "Environmental Impact Assessment of",
      "Climate Resilience Strategies in",
    ],
    business: [
      "Strategic Management Approaches to",
      "Organizational Behavior Analysis in",
      "Corporate Performance Metrics for",
    ],
    social: [
      "Community Engagement Models for",
      "Sociological Perspectives on",
      "Human Interaction Patterns in",
    ],
    technology: [
      "Technological Innovation Framework for",
      "Digital Transformation Strategies in",
      "Emerging Tech Applications in",
    ],
  };
  
  // Generic title templates
  const genericTemplates = [
    "Exploring the Relationship Between {{topic}} and Societal Outcomes",
    "A Comparative Analysis of {{topic}} Methodologies: Past, Present, and Future",
    "{{topic}}: A Critical Assessment of Current Research and Future Directions",
    "The Evolution and Impact of {{topic}} in the 21st Century",
    "Rethinking {{topic}}: Innovative Approaches and Theoretical Frameworks",
    "Beyond Traditional Paradigms: New Perspectives on {{topic}}",
    "Intersectionality and {{topic}}: Bridging Disciplinary Boundaries",
    "Quantitative and Qualitative Approaches to Understanding {{topic}}",
  ];
  
  // Find matching keywords
  const lowerTopic = topic.toLowerCase();
  const matchingKeywords = Object.keys(topicKeywords).filter(keyword => 
    lowerTopic.includes(keyword)
  );
  
  let specializedTemplates: string[] = [];
  
  // Collect specialized templates for any matching keywords
  matchingKeywords.forEach(keyword => {
    specializedTemplates = [...specializedTemplates, ...topicKeywords[keyword]];
  });
  
  // Combine and prepare templates
  const allTemplates = [...specializedTemplates, ...genericTemplates];
  const selectedTemplates = allTemplates
    .sort(() => 0.5 - Math.random()) // Shuffle
    .slice(0, 5); // Take first 5
  
  // Generate titles by replacing {{topic}} with actual topic
  return selectedTemplates.map(template => {
    if (template.includes('{{topic}}')) {
      return template.replace('{{topic}}', topic);
    } else {
      return `${template} ${topic}`;
    }
  });
};