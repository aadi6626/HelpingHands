import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();

    console.log(`Form submission received - Type: ${type}`);
    console.log("Data:", JSON.stringify(data, null, 2));

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let message = "";
    let error = null;

    switch (type) {
      case "request":
        const { error: reqError } = await supabase.from("requests").insert({
          name: data.name,
          needs: data.needs,
          city: data.city,
          details: data.details || null,
        });
        error = reqError;
        message = `Resource request submitted by ${data.name} for ${data.needs} in ${data.city}`;
        break;

      case "donate":
        const { error: donError } = await supabase.from("donations").insert({
          name: data.name,
          item: data.item,
          city: data.city,
        });
        error = donError;
        message = `Donation pledged by ${data.name}: ${data.item} in ${data.city}`;
        break;

      case "report":
        const { error: repError } = await supabase.from("reports").insert({
          type: data.type,
          location_detail: data.locationDetail,
          city: data.city,
          description: data.description || null,
        });
        error = repError;
        message = `Incident reported: ${data.type} at ${data.locationDetail}, ${data.city}`;
        break;

      case "ngo":
        const { error: ngoError } = await supabase.from("ngos").insert({
          name: data.name,
          reg_number: data.regNumber,
          city: data.city,
          contact: data.contact,
        });
        error = ngoError;
        message = `NGO registration: ${data.name} (${data.regNumber}) in ${data.city}`;
        break;

      default:
        message = "Unknown form type";
    }

    if (error) {
      console.error("Database insert error:", error);
      throw new Error(error.message);
    }

    console.log(message);

    return new Response(
      JSON.stringify({ success: true, message }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Form submission error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to process form" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
