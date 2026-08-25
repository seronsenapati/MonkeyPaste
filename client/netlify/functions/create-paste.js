const { connectDB, Paste } = require('./db');

function generateCode() {
  const chars = '0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    await connectDB();

    const { content } = JSON.parse(event.body || '{}');

    if (!content || !content.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Content is required' }),
      };
    }

    // Generate unique 6-digit code (retry up to 10 times)
    let code;
    let attempts = 0;
    while (attempts < 10) {
      code = generateCode();
      const existing = await Paste.findOne({ code });
      if (!existing) break;
      attempts++;
    }

    const paste = await Paste.create({ code, content });

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: paste.code }),
    };
  } catch (err) {
    console.error('create-paste error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create paste' }),
    };
  }
};
