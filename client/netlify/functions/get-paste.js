const { connectDB, Paste } = require('./db');

exports.handler = async (event) => {
  // Only allow GET
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Get code from query string: /.netlify/functions/get-paste?code=123456
  const code = event.queryStringParameters && event.queryStringParameters.code;

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Code is required' }),
    };
  }

  try {
    await connectDB();

    const paste = await Paste.findOne({ code });

    if (!paste) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Paste not found' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: paste.content }),
    };
  } catch (err) {
    console.error('get-paste error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve paste' }),
    };
  }
};
