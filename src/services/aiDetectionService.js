// Free AI Text Detection Service - No API keys required
// Uses advanced linguistic analysis patterns to detect AI-generated text

export const analyzeTextWithAI = async (text) => {
  try {
    // Check minimum text length for accurate analysis
    if (text.trim().length < 250) {
      return {
        success: false,
        error: 'Text is too short for accurate analysis. Please provide at least 250 characters for reliable AI detection results.'
      };
    }

    // Text preprocessing
    const cleanText = text.toLowerCase().trim();
    const words = cleanText.split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);

    // Analysis metrics
    const metrics = {
      wordCount: words.length,
      sentenceCount: sentences.length,
      paragraphCount: paragraphs.length,
      avgWordsPerSentence: words.length / Math.max(sentences.length, 1),
      avgWordsPerParagraph: words.length / Math.max(paragraphs.length, 1),
      uniqueWords: new Set(words).size,
      vocabularyDiversity: new Set(words).size / Math.max(words.length, 1),
      avgSentenceLength: sentences.reduce((sum, s) => sum + s.length, 0) / Math.max(sentences.length, 1),
      avgParagraphLength: paragraphs.reduce((sum, p) => sum + p.length, 0) / Math.max(paragraphs.length, 1)
    };

    // AI detection patterns with much more aggressive detection
    const aiIndicators = {
      repetitivePhrases: detectRepetitivePhrases(cleanText),
      formalLanguage: detectFormalLanguage(cleanText),
      consistentStructure: detectConsistentStructure(sentences),
      lackOfPersonalTouch: detectPersonalTouch(cleanText),
      technicalTerminology: detectTechnicalTerms(cleanText),
      sentenceComplexity: analyzeSentenceComplexity(sentences),
      paragraphUniformity: analyzeParagraphUniformity(paragraphs),
      vocabularySophistication: analyzeVocabulary(words),
      aiPatterns: detectAIPatterns(cleanText),
      emotionalExpression: detectEmotionalExpression(cleanText),
      perfectGrammar: detectPerfectGrammar(text),
      repetitiveStructure: detectRepetitiveStructure(sentences),
      academicStyle: detectAcademicStyle(cleanText)
    };

    // Calculate AI probability with much lower threshold
    const aiScore = calculateAIScore(aiIndicators, metrics);
    const isAI = aiScore > 0.35; // Much lower threshold - more sensitive
    const confidence = Math.round(aiScore * 100);

    // Generate detailed analysis
    const details = generateAnalysisDetails(aiIndicators, metrics, aiScore);

    return {
      success: true,
      result: {
        isAI: isAI,
        confidence: confidence,
        details: details,
        metrics: metrics,
        indicators: aiIndicators
      }
    };

  } catch (error) {
    console.error('Analysis Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to analyze text'
    };
  }
};

// Helper functions for AI detection
function detectRepetitivePhrases(text) {
  const phrases = text.match(/\b\w+\s+\w+\s+\w+\b/g) || [];
  const phraseCounts = {};
  phrases.forEach(phrase => {
    phraseCounts[phrase] = (phraseCounts[phrase] || 0) + 1;
  });
  const repetitiveCount = Object.values(phraseCounts).filter(count => count > 1).length;
  return Math.min(repetitiveCount / Math.max(phrases.length, 1), 1);
}

function detectFormalLanguage(text) {
  const formalWords = [
    'furthermore', 'moreover', 'additionally', 'consequently', 'therefore', 'thus', 'hence', 
    'subsequently', 'accordingly', 'nevertheless', 'nonetheless', 'however', 'nevertheless', 
    'in conclusion', 'to summarize', 'as a result', 'for instance', 'specifically', 'particularly', 
    'notably', 'significantly', 'considerably', 'substantially', 'consequently', 'accordingly',
    'furthermore', 'moreover', 'additionally', 'in addition', 'moreover', 'furthermore',
    'it is important to note', 'it should be noted', 'it is worth mentioning', 'it is crucial',
    'it is essential', 'it is necessary', 'it is vital', 'it is imperative', 'it is critical'
  ];
  const formalCount = formalWords.filter(word => text.includes(word)).length;
  return Math.min(formalCount / 5, 1); // Very low threshold - 5 formal words trigger detection
}

function detectConsistentStructure(sentences) {
  if (sentences.length < 2) return 0;
  const lengths = sentences.map(s => s.length);
  const avgLength = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;
  const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / lengths.length;
  return Math.max(0, 1 - (variance / 500)); // Much more sensitive - 500 instead of 800
}

function detectPersonalTouch(text) {
  const personalWords = ['i', 'me', 'my', 'mine', 'myself', 'we', 'us', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves'];
  const personalCount = personalWords.filter(word => text.includes(word)).length;
  return Math.max(0, 1 - (personalCount / 10)); // Much more sensitive - 10 instead of 15
}

function detectTechnicalTerms(text) {
  const technicalWords = [
    'algorithm', 'implementation', 'methodology', 'framework', 'paradigm', 'optimization', 
    'efficiency', 'scalability', 'robustness', 'reliability', 'functionality', 'capability', 
    'utilization', 'facilitation', 'enhancement', 'integration', 'deployment', 'configuration', 
    'architecture', 'infrastructure', 'protocol', 'mechanism', 'strategy', 'approach', 'solution',
    'methodology', 'framework', 'paradigm', 'optimization', 'efficiency', 'scalability',
    'robustness', 'reliability', 'functionality', 'capability', 'utilization', 'facilitation',
    'enhancement', 'integration', 'deployment', 'configuration', 'architecture', 'infrastructure'
  ];
  const technicalCount = technicalWords.filter(word => text.includes(word)).length;
  return Math.min(technicalCount / 4, 1); // Very low threshold - 4 technical words trigger detection
}

function analyzeSentenceComplexity(sentences) {
  if (sentences.length === 0) return 0;
  const complexities = sentences.map(sentence => {
    const words = sentence.split(/\s+/);
    const longWords = words.filter(word => word.length > 6).length;
    return longWords / Math.max(words.length, 1);
  });
  return complexities.reduce((sum, comp) => sum + comp, 0) / complexities.length;
}

function analyzeParagraphUniformity(paragraphs) {
  if (paragraphs.length < 2) return 0;
  const lengths = paragraphs.map(p => p.length);
  const avgLength = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;
  const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / lengths.length;
  return Math.max(0, 1 - (variance / 5000)); // Much more sensitive - 5000 instead of 8000
}

function analyzeVocabulary(words) {
  if (words.length === 0) return 0;
  const uniqueWords = new Set(words);
  const sophisticatedWords = Array.from(uniqueWords).filter(word => word.length > 8).length;
  return sophisticatedWords / Math.max(uniqueWords.size, 1);
}

function detectAIPatterns(text) {
  const aiPatterns = [
    'in conclusion', 'to summarize', 'as a result', 'therefore', 'thus', 'hence',
    'furthermore', 'moreover', 'additionally', 'consequently', 'accordingly',
    'it is important to note', 'it should be noted', 'it is worth mentioning',
    'on the other hand', 'in contrast', 'however', 'nevertheless', 'nonetheless',
    'for instance', 'for example', 'specifically', 'particularly', 'notably',
    'significantly', 'considerably', 'substantially', 'remarkably', 'notably',
    'in summary', 'to conclude', 'in essence', 'in other words', 'that is to say',
    'as mentioned earlier', 'as stated previously', 'as discussed above',
    'it is crucial to', 'it is essential to', 'it is necessary to', 'it is vital to',
    'it is imperative to', 'it is critical to', 'it is fundamental to'
  ];
  const patternCount = aiPatterns.filter(pattern => text.includes(pattern)).length;
  return Math.min(patternCount / 3, 1); // Very low threshold - 3 patterns trigger detection
}

function detectEmotionalExpression(text) {
  const emotionalWords = [
    'love', 'hate', 'angry', 'happy', 'sad', 'excited', 'frustrated', 'worried', 'scared', 
    'nervous', 'confident', 'proud', 'ashamed', 'embarrassed', 'surprised', 'shocked', 
    'amazed', 'disappointed', 'relieved', 'anxious', 'calm', 'peaceful', 'joyful', 
    'miserable', 'ecstatic', 'terrified', 'thrilled', 'devastated', 'elated', 'depressed'
  ];
  const emotionalCount = emotionalWords.filter(word => text.includes(word)).length;
  return Math.max(0, 1 - (emotionalCount / 8)); // Much more sensitive - 8 instead of 10
}

function detectPerfectGrammar(text) {
  // Check for overly perfect grammar patterns
  const perfectPatterns = [
    /[A-Z][^.!?]*[.!?]/g, // Perfect sentence capitalization
    /\b(?:the|a|an)\s+\w+/g, // Proper article usage
    /\b(?:is|are|was|were)\s+\w+ing/g, // Perfect progressive tense
    /\b(?:have|has|had)\s+\w+ed/g // Perfect past perfect
  ];
  
  let perfectCount = 0;
  perfectPatterns.forEach(pattern => {
    const matches = text.match(pattern) || [];
    perfectCount += matches.length;
  });
  
  return Math.min(perfectCount / 20, 1); // High perfect grammar suggests AI
}

function detectRepetitiveStructure(sentences) {
  if (sentences.length < 3) return 0;
  
  // Check for repetitive sentence structures
  const structures = sentences.map(s => {
    const words = s.split(/\s+/);
    return words.length; // Simple structure based on word count
  });
  
  const uniqueStructures = new Set(structures);
  const structureVariety = uniqueStructures.size / structures.length;
  
  return Math.max(0, 1 - structureVariety); // Low variety = more repetitive = more likely AI
}

function detectAcademicStyle(text) {
  const academicWords = [
    'research', 'study', 'analysis', 'investigation', 'examination', 'evaluation',
    'assessment', 'review', 'literature', 'methodology', 'framework', 'theoretical',
    'empirical', 'quantitative', 'qualitative', 'statistical', 'correlation',
    'significance', 'hypothesis', 'conclusion', 'recommendation', 'implication'
  ];
  
  const academicCount = academicWords.filter(word => text.includes(word)).length;
  return Math.min(academicCount / 3, 1); // Very low threshold for academic style
}

function calculateAIScore(indicators, metrics) {
  const weights = {
    repetitivePhrases: 0.10,
    formalLanguage: 0.18, // Increased weight
    consistentStructure: 0.12,
    lackOfPersonalTouch: 0.12,
    technicalTerminology: 0.10,
    sentenceComplexity: 0.08,
    paragraphUniformity: 0.08,
    vocabularySophistication: 0.08,
    aiPatterns: 0.15, // Increased weight
    emotionalExpression: 0.08,
    perfectGrammar: 0.05,
    repetitiveStructure: 0.08,
    academicStyle: 0.08
  };

  let score = 0;
  for (const [key, weight] of Object.entries(weights)) {
    score += indicators[key] * weight;
  }

  // Much more aggressive adjustments
  if (metrics.wordCount < 20) score *= 0.6; // Very short texts are harder
  if (metrics.wordCount > 100) score *= 1.2; // Longer texts give more reliable signals
  if (metrics.avgWordsPerSentence > 15) score *= 1.25; // Long sentences suggest AI
  if (metrics.vocabularyDiversity < 0.6) score *= 1.3; // Low diversity strongly suggests AI
  if (metrics.sentenceCount > 5 && indicators.consistentStructure > 0.4) score *= 1.2; // Consistent structure

  return Math.min(Math.max(score, 0), 1); // Clamp between 0 and 1
}

function generateAnalysisDetails(indicators, metrics, aiScore) {
  const details = [];
  
  if (indicators.repetitivePhrases > 0.1) {
    details.push("Repetitive phrase patterns detected, which is common in AI-generated text.");
  }
  
  if (indicators.formalLanguage > 0.2) {
    details.push("Extensive use of formal language and transitional phrases typical of AI writing.");
  }
  
  if (indicators.consistentStructure > 0.5) {
    details.push("Very consistent sentence structure and length patterns suggest automated generation.");
  }
  
  if (indicators.lackOfPersonalTouch > 0.4) {
    details.push("Limited use of personal pronouns and conversational language.");
  }
  
  if (indicators.technicalTerminology > 0.1) {
    details.push("Presence of technical terminology and formal academic language.");
  }
  
  if (indicators.aiPatterns > 0.2) {
    details.push("Use of common AI writing patterns and transitional phrases.");
  }
  
  if (metrics.vocabularyDiversity < 0.6) {
    details.push("Low vocabulary diversity indicates repetitive word usage.");
  }
  
  if (metrics.avgWordsPerSentence > 15) {
    details.push("Long, complex sentences are characteristic of AI-generated content.");
  }
  
  if (indicators.emotionalExpression > 0.6) {
    details.push("Limited emotional expression and personal sentiment.");
  }
  
  if (indicators.perfectGrammar > 0.3) {
    details.push("Overly perfect grammar patterns suggest automated generation.");
  }
  
  if (indicators.repetitiveStructure > 0.4) {
    details.push("Repetitive sentence structures indicate AI generation.");
  }
  
  if (indicators.academicStyle > 0.2) {
    details.push("Academic writing style with formal terminology.");
  }
  
  if (details.length === 0) {
    details.push("Text shows natural variation in structure and language use typical of human writing.");
  }
  
  const conclusion = aiScore > 0.35 
    ? "Overall analysis suggests this text was likely generated by AI."
    : "Overall analysis suggests this text was likely written by a human.";
    
  return details.join(" ") + " " + conclusion;
}
