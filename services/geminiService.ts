import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const SYSTEM_INSTRUCTION = `
You are the intelligent assistant for 'Digital Craft Productions (DCP)', a full-spectrum digital marketing agency based in Sukhedhara, Kathmandu, Nepal.
Your goal is to help potential clients understand our services, showcase our creativity, and encourage them to contact us.

Key Information:
- Agency Name: Digital Craft Productions (DCP).
- Services: Video Production, Web Development, Scriptwriting, Branding, Social Media Marketing, SEO, Ad Campaigns, Voiceovers, Festive Campaigns, 3D Animation & Modeling.
- Location: Sukhedhara, Kathmandu.
- Contact: Email (digitalcraftp@gmail.com), Phone/WhatsApp (+977-9844659531).
- Office Hours: Sunday to Saturday (Open all week).
- Stats: 10+ Happy Clients, 20+ Successful Projects.
- Tone: Creative, Professional, Culturally Sharp (Nepali/English context), and Enthusiastic.
- Call to Action: Suggest messaging on WhatsApp or booking a consultation.

If asked about prices, say: "Pricing depends on the scope of the project. Please reach out via WhatsApp at +977-9844659531 for a custom quote!"
`;

// Helper to safely get the API key from various environments (Vite, CRA, etc.)
const getApiKey = (): string | undefined => {
  // Check for Vite environment variable
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_KEY) {
    return (import.meta as any).env.VITE_API_KEY;
  }
  // Check for standard process.env (Webpack/Node)
  if (typeof process !== 'undefined' && process.env?.API_KEY) {
    return process.env.API_KEY;
  }
  return undefined;
};

export const initializeChat = (): void => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Chatbot features will be disabled.");
    return;
  }
  
  try {
    genAI = new GoogleGenAI({ apiKey });
    chatSession = genAI.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
  } catch (error) {
    console.error("Failed to initialize Gemini chat:", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
    return "I'm having trouble connecting to the server right now. Please try again later or contact us directly on WhatsApp +977 9844659531.";
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I didn't catch that. Could you please rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm facing a temporary glitch. Please reach out to us directly on WhatsApp!";
  }
};