const http = require('http');

// Test data that matches Vapi webhook structure
const testPayload = {
  "message": {
    "type": "function-call",
    "functionCall": {
      "name": "submitLead", 
      "parameters": {
        "firstName": "John",
        "lastName": "Doe", 
        "phoneNumber": "+15551234567",
        "email": "john.doe@example.com",
        "state": "texas",
        "county": "harris",
        "arrestDate": "2024-12-15",
        "isFirstOffense": true,
        "hadAccident": false,
        "hasCDL": false,
        "questions": "I was arrested last night and need help understanding the process."
      }
    }
  },
  "call": {
    "id": "test-call-123",
    "type": "inboundPhoneCall",
    "phoneNumber": "+15551234567",
    "status": "ended",
    "startedAt": "2024-12-15T23:00:00Z",
    "endedAt": "2024-12-15T23:05:00Z"
  }
};

// Test webhook endpoint
const testWebhook = async () => {
  try {
    console.log('🧪 Testing Vapi webhook endpoint...\n');
    
    const response = await fetch('http://localhost:3000/api/webhooks/vapi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer duhook_204738505308q73298ufjncdjw0e0_a8f3k2n9m4x7nioncuetvrrw7DHID'
      },
      body: JSON.stringify(testPayload)
    });

    console.log('📡 Response status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Success! Response:', JSON.stringify(result, null, 2));
    } else {
      const error = await response.text();
      console.log('❌ Error:', error);
    }

  } catch (error) {
    console.error('🚨 Test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure your Next.js dev server is running:');
      console.log('   npm run dev');
    }
  }
};

// Run the test
testWebhook();