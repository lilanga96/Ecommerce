import { serve } from "https://deno.land/std/http/server.ts";

const handler = async (req) => {
    const headers = {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers });
    }

    try {
       
        const { to, subject, html } = await req.json();

       
        if (!to || !subject || !html) {
            return new Response(
                JSON.stringify({ message: "Missing required fields" }),
                {
                    status: 400,
                    headers,
                }
            );
        }

        
        console.log(`Sending email to ${to} with subject: ${subject}`);

        

       
        return new Response(
            JSON.stringify({ message: "Email sent successfully" }),
            {
                status: 200,
                headers,
            }
        );
    } catch (error) {
        console.error("Error processing request:", error);

        // Respond with error
        return new Response(
            JSON.stringify({
                message: "Failed to process request",
                error: error.message,
            }),
            {
                status: 500,
                headers,
            }
        );
    }
};

// Start the server
serve(handler);
