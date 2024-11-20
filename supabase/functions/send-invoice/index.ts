export const handler = async (req) => {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  });

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers }
      );
    }

    const { email, cart } = await req.json();
    if (!email || !cart || cart.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid input: email or cart missing" }),
        { status: 400, headers }
      );
    }

    // Simulate invoice processing
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
   

    return new Response(
      JSON.stringify({ message: "Invoice sent successfully!" }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request", details: error.message }),
      { status: 500, headers }
    );
  }
};