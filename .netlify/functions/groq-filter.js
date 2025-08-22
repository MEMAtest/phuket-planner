exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { prompt } = JSON.parse(event.body);
    
    // Check for API key
    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }
    
    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ 
          role: 'user', 
          content: prompt 
        }],
        temperature: 0.2,
        max_tokens: 500
      })
    });
    
    // Check if Groq API call was successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', response.status, errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Groq API error' })
      };
    }
    
    // Parse and return the response
    const data = await response.json();
    
    // Log for debugging (you can see this in Netlify function logs)
    console.log('Groq response received:', data.choices?.[0]?.message?.content?.substring(0, 100));
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Important for CORS
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', details: error.message })
    };
  }
};
