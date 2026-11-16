<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/d61a7761-fcbd-4e3e-86ae-dd0c8781581c

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Assignment 1: Research Paper Agent (vibe coded in Google AI Studio)

ArXivAgent is a research paper agent built with the Build tab in [Google AI Studio](https://aistudio.google.com/). You give it an arXiv URL, a paper title, or an abstract, and it returns:

1. **Core concept extraction**: the problem, the method, and the key breakthroughs, in under 300 words.
2. **Architectural flowchart**: a Mermaid.js diagram of the system.
3. **Future work and internship ideas**: three resume-ready project extensions.

**Prompting technique: chain of thought.** The prompt makes the model reason through the paper in ordered steps, each building on the one before, and then return structured JSON. The full prompt is in [`PROMPT.txt`](PROMPT.txt). The app config is in [`metadata.json`](metadata.json).

### Run locally
1. `npm install`
2. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`.
3. `npm run dev`
