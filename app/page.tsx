import GlitchSurface from "./glitch-surface";

function words(text: string) {
  return text.split(/(\s+)/).map((part, index) =>
    /\s/.test(part) ? part : <span className="word" key={index}>{part}</span>
  );
}

export default function Home() {
  return (
    <GlitchSurface>
      <h1>{words("Alireza Sarabchi")}</h1>
      <p>
        <em>{words("I craft digital products")}</em>
        {words(", from the first idea to the last detail.")}
      </p>
      <p>
        {words("Since 2007, I’ve been designing and building for the web, moving between design, code, research, and business. I like figuring things out, getting into the details, and making ideas real.")}
      </p>
    </GlitchSurface>
  );
}
