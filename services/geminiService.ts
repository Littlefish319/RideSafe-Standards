import { GoogleGenAI, Type } from "@google/genai";
import { Standard, ComparisonResult } from '../types';

// Initialize the API client
// Note: process.env.API_KEY is guaranteed to be available in this environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are a world-class expert on international amusement attraction safety standards. 
You specialize in standards from organizations like ASTM International (Committee F24), ISO (International Organization for Standardization), CEN (European Standards/EN), and SAC (GB Standards like GB 8408).
Your knowledge covers specific standards like ISO 13849 (Control Systems), ASTM F2291 (Design), ASTM F770 (Operations), EN 13814, and ISO 17842.

When a user provides a description or a query, your goal is to identify the most relevant real-world standards.
Do not invent standards. Only provide existing, published standards.
Provide a clear title, the standard code (e.g., "ASTM F2291-24"), the organization, a concise description, and specifically why it is relevant to the user's query.
`;

export const searchStandardsWithAI = async (query: string): Promise<Standard[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User Query: "${query}"
      
      Recommend 3 to 6 distinct amusement industry standards that are most relevant to this query. 
      If the query is vague, provide general key standards (like ASTM F2291, EN 13814, or GB 8408).`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              code: {
                type: Type.STRING,
                description: "The alphanumeric code of the standard (e.g., ASTM F2291, ISO 13849-1)."
              },
              title: {
                type: Type.STRING,
                description: "The official title of the standard."
              },
              organization: {
                type: Type.STRING,
                description: "The issuing organization (e.g., ASTM, ISO, CEN, SAC)."
              },
              description: {
                type: Type.STRING,
                description: "A 1-2 sentence summary of what the standard covers."
              },
              relevance: {
                type: Type.STRING,
                description: "A short explanation of why this specific standard matches the user's query."
              },
              category: {
                type: Type.STRING,
                enum: ['Safety', 'Design', 'Operations', 'Manufacturing', 'Maintenance'],
                description: "The primary category of the standard."
              }
            },
            required: ["code", "title", "organization", "description", "relevance", "category"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    const data = JSON.parse(jsonText) as Standard[];
    return data;

  } catch (error) {
    console.error("Gemini Search Error:", error);
    throw new Error("Failed to search standards. Please try again.");
  }
};

export const explainStandardWithAI = async (standard: Standard): Promise<{ explanation: string, mermaid: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Explain the standard "${standard.code}: ${standard.title}" in detail for an amusement park engineer. 
      
      1. Provide 3 key takeaways formatted as bullet points in plain text.
      2. Generate a valid Mermaid.js flowchart (graph TD) that visualizes the process, hierarchy, or logic of this standard. 
      
      CRITICAL MERMAID SYNTAX RULES:
      - Start with "graph TD".
      - Wrap ALL node labels in double quotes. Example: A["Start Process (ISO 12100)"] --> B["Next Step"]
      - Do NOT use parentheses () inside node text unless the text is completely wrapped in quotes.
      - Ensure the syntax is clean and valid.
      
      Output Format: JSON.
      `,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: { type: Type.STRING, description: "The text explanation with bullet points." },
            mermaid: { type: Type.STRING, description: "Valid Mermaid.js syntax string (graph TD)." }
          },
          required: ["explanation", "mermaid"]
        }
      }
    });
    
    const jsonText = response.text;
    if (!jsonText) return { explanation: "No details available", mermaid: "" };
    return JSON.parse(jsonText);

  } catch (error) {
    console.error("Gemini Explain Error:", error);
    return { explanation: "Unable to generate explanation at this time.", mermaid: "" };
  }
};

export const compareStandardsWithAI = async (standards: string[], topic: string): Promise<ComparisonResult> => {
  try {
    const stdString = standards.join(", ");
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Compare the following amusement industry standards: [${stdString}].
      Focus specifically on the topic: "${topic}".
      
      Create a comparison table focusing on 4-5 key engineering or safety aspects related to that topic.
      If a standard doesn't specifically cover the topic, state that clearly in the value.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            standards: { type: Type.ARRAY, items: { type: Type.STRING } },
            topic: { type: Type.STRING },
            summary: { type: Type.STRING, description: "A brief summary of the main philosophical or technical differences between them regarding this topic." },
            points: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  aspect: { type: Type.STRING, description: "The aspect being compared (e.g., 'G-Force Limits')" },
                  values: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "The values for each standard, in the same order as the 'standards' array."
                  }
                },
                required: ["aspect", "values"]
              }
            }
          },
          required: ["standards", "topic", "summary", "points"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("Empty response");
    
    return JSON.parse(jsonText) as ComparisonResult;

  } catch (error) {
    console.error("Gemini Compare Error:", error);
    throw new Error("Failed to generate comparison.");
  }
};