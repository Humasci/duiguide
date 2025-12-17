// Vapi webhook types for DUI Guide integration

export interface VapiCall {
  id: string;
  type: "inboundPhoneCall" | "outboundPhoneCall";
  phoneNumber: string;
  status: "queued" | "ringing" | "in-progress" | "ended" | "busy" | "no-answer" | "failed";
  startedAt: string;
  endedAt?: string;
  duration?: number;
  transcript?: string;
  recordingUrl?: string;
  cost?: number;
}

export interface VapiFunctionCall {
  name: string;
  parameters: {
    [key: string]: unknown;
  };
}

export interface VapiMessage {
  type: "function-call" | "speech-update" | "transcript-update" | "end-of-call-report";
  functionCall?: VapiFunctionCall;
  transcript?: string;
  text?: string;
  role?: "user" | "assistant";
}

export interface VapiWebhookPayload {
  message: VapiMessage;
  call: VapiCall;
  timestamp: string;
}

// Specific types for our DUI lead submission function
export interface DuiLeadSubmissionParams {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  state: string;
  county: string;
  arrestDate?: string;
  isFirstOffense: boolean;
  hadAccident: boolean;
  hasCDL: boolean;
  questions?: string;
  [key: string]: unknown;
}

export interface VapiDuiWebhook extends VapiWebhookPayload {
  message: {
    type: "function-call";
    functionCall: {
      name: "submitLead";
      parameters: DuiLeadSubmissionParams;
    };
  };
}

// Response types for webhook handlers
export interface VapiWebhookResponse {
  success: boolean;
  leadId?: string;
  message?: string;
  error?: string;
}

// Call analysis types for post-call processing
export interface VapiCallAnalysis {
  callId: string;
  duration: number;
  transcript: string;
  sentiment: "positive" | "negative" | "neutral";
  leadQuality: "high" | "medium" | "low";
  urgency: "immediate" | "urgent" | "normal";
  followUpRequired: boolean;
  notes?: string;
}