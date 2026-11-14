import GlitchSurface from "./glitch-surface";

function words(text: string) {
  return text.split(/(\s+)/).map((part, index) =>
    /\s/.test(part) ? part : <span className="word" key={index}>{part}</span>
  );
}

export default function Home() {
  return (
    <GlitchSurface>
      <svg className="crt-filter" aria-hidden="true" focusable="false">
        <defs>
          <filter id="crt-curve" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
            <feImage href="/crt-displacement.png" x="-5%" y="-5%" width="110%" height="110%" preserveAspectRatio="none" result="curve" />
            <feDisplacementMap in="SourceGraphic" in2="curve" scale="20" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div className="crt-text">
      <h1>{words("Alireza Sarabchi")}</h1>
      <p>
        <em>{words("I craft digital products")}</em>
        {words(", from the first idea to the last detail.")}
      </p>
      <p>
        {words("Since 2007, I’ve been designing and building for the web, moving between design, code, research, and business. I like figuring things out, getting into the details, and making ideas real.")}
      </p>
      </div>
    </GlitchSurface>
  );
}
