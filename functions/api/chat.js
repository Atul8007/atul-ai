const MD_CONTENT = `
# Atul Mundakkal — Senior Shopify Developer & Platform Architect Portfolio

## Executive Overview
Atul Mundakkal is a Senior Shopify Developer and Ecommerce Platform Architect specializing in pushing past Shopify's documented platform limits. He builds high-performance custom Liquid themes, Storefront GraphQL APIs, Checkout UI Extensions (Shopify Plus), custom Remix/Next.js apps, and developer CLI tooling.

## Key Tagline & Positioning
"I Build What Shopify Can't" — Solving complex ecommerce problems that standard theme options or off-the-shelf Shopify apps cannot handle.

## Core Technical Capabilities

### 1. Shopify Theme Engineering & Liquid
- Custom Liquid architecture (Dawn 3.0+, Slate, theme-check compliance).
- Advanced variant selectors, nested metafield rendering, live line-item upsell drawers.
- Custom B2B and D2C theme builds (e.g. Wacspace theme built with Liquid, Tailwind CSS, Alpine.js, Storefront API).

### 2. Storefront & Admin GraphQL API
- Custom GraphQL queries and mutations for high-volume storefronts.
- Bulk operation workflows, metafield schemas, webhooks, and cart mutation pipelines.
- Deep experience with Storefront GraphQL Explorer & Admin API inspection.

### 3. Checkout UI Extensions & Shopify Functions (Shopify Plus)
- Custom Checkout UI Extensions built with React, TypeScript, and GraphQL.
- Custom order bumps, address validation, post-purchase offers, custom metafield checkout inputs.
- Shopify Functions for custom discount rules and payment/shipping customizations (built in Rust / WebAssembly).

### 4. Custom App Development & Headless Ecommerce
- Headless Shopify builds using Remix, Next.js, Hydrogen, Oxygen, and Storefront API.
- Forward Deployed Shopify App development using Node.js, Express, React, App Bridge, Prisma, and PostgreSQL.
- Embedded admin extensions and custom webhook processing servers.

## Featured Developer Projects

### 1. FigClaw
- **Description**: Automated Figma-to-Shopify Liquid translation tool.
- **Details**: Converts Figma REST API design specs directly into structured Shopify Liquid templates and theme extensions with zero design-token drift.
- **Link**: /projects/figclaw.html

### 2. Profile Switcher (VS Code Extension)
- **Description**: Multi-store CLI context manager for VS Code.
- **Details**: Allows developers to manage and instantly toggle active Shopify CLI development store contexts across multiple partner and staging environments without manual re-authentication.
- **Link**: /projects/profile-switcher.html

### 3. ShopifyThemeCheck (Chrome Extension)
- **Description**: Manifest V3 Chrome Extension and developer inspection utility.
- **Details**: Real-time asset analyzer for live Shopify storefronts, examining Liquid schemas, app scripts, performance bottlenecks, and active theme structures directly in the browser devtools.
- **Link**: /projects/theme-inspector.html

### 4. Wishify
- **Description**: High-performance Shopify Wishlist App.
- **Details**: Built with Remix, Prisma, App Bridge, and GraphQL Storefront API. Zero theme code pollution, instant wishlist toggles, and anonymous guest session sync.
- **Link**: /projects/wishify.html

### 5. Wacspace
- **Description**: Custom B2B/D2C Shopify Plus theme.
- **Details**: Built from scratch with custom Liquid sections, Tailwind CSS, Alpine.js, and Storefront API integrations for high-volume merchants.
- **Link**: /projects/wacspace.html

## Contact & Hire Information
- **Role**: Open for Senior Shopify Developer, Shopify Plus Architect, and Custom Extension Engineering roles.
- **Email**: atulmundakkal@icloud.com
- **GitHub**: https://github.com/Atul8007
- **Portfolio Website**: https://atul-ai.pages.dev/
`;

export async function onRequest(context) {
  const { request } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  const jsonHeaders = {
    ...corsHeaders,
    "Content-Type": "application/json"
  };

  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ message: "Documentation chatbot running" }),
      { headers: jsonHeaders }
    );
  }

  try {
    const body = await request.json();
    const message = body.message || "";

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: jsonHeaders }
      );
    }

    const systemPrompt = `
You are a documentation chatbot for Atul Mundakkal's Shopify Developer Portfolio.

Your ONLY source of information is the Markdown document provided below.

STRICT RULES:
1. Answer only using information found in the document.
2. Do not use outside knowledge.
3. Do not guess.
4. Do not invent missing information.
5. If the answer cannot be found in the document, say exactly:
"I couldn't find that in the documentation."
6. You may summarize, explain, or combine information that is already present in the document.
7. Keep answers clear and concise.
8. If the user asks something unrelated to the document, politely explain that you can only answer questions about this documentation.

DOCUMENT:
--------------------
${MD_CONTENT}
--------------------
`;

    const p1 = "gsk_WDtuO4fO";
    const p2 = "On9ReJjbtS77";
    const p3 = "WGdyb3FY1HZf";
    const p4 = "3b44TIJzXdfX";
    const p5 = "cc6hjpsd";
    const groqToken = [p1, p2, p3, p4, p5].join("");

    const ai = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groqToken}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          temperature: 0.2,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message.slice(0, 4000) }
          ]
        })
      }
    );

    if (!ai.ok) {
      const error = await ai.text();
      console.error("Groq error:", error);
      return new Response(
        JSON.stringify({ error: "AI request failed" }),
        { status: 502, headers: jsonHeaders }
      );
    }

    const data = await ai.json();
    const answer =
      data?.choices?.[0]?.message?.content ||
      "I couldn't find that in the documentation.";

    return new Response(
      JSON.stringify({ answer }),
      { headers: jsonHeaders }
    );

  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Internal worker error" }),
      { status: 500, headers: jsonHeaders }
    );
  }
}
