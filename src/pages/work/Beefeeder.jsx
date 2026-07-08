import img1 from "../../assets/flowerfinal1.png";
import img2 from "../../assets/flowercone2.png";
import img3 from "../../assets/flowerUV3.png";
import img4a from "../../assets/flowerblender4a.png";
import img4b from "../../assets/flowerblender4b.png";
import img4c from "../../assets/flower4c.png";
import img5a from "../../assets/flowerexploded5.png";
import img5b from "../../assets/flowerparametric5b.png";
import img6 from "../../assets/flowerparametric6a.png";
import img7a from "../../assets/flowerSTL7a.png";
import img7b from "../../assets/flowerSTL7b.png";
import img8 from "../../assets/flowerfinal8.png";
import img9 from "../../assets/flowertimeline9.png";

const s = { fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#86868B", marginBottom: 6 };
const c = { fontSize: 16, color: "#6E6E73", lineHeight: 1.6, maxWidth: 640 };

function Block({ src, subheading, caption }) {
  return (
    <div>
      <img src={src} alt={subheading} style={{ width: "100%", borderRadius: 12, display: "block", marginBottom: 16 }} />
      <p style={s}>{subheading}</p>
      <p style={c}>{caption}</p>
    </div>
  );
}

function SideBySide({ left, right }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div>
        <img src={left.src} alt={left.subheading} style={{ width: "100%", borderRadius: 12, display: "block", marginBottom: 16 }} />
        <p style={s}>{left.subheading}</p>
        <p style={c}>{left.caption}</p>
      </div>
      <div>
        <img src={right.src} alt={right.subheading} style={{ width: "100%", borderRadius: 12, display: "block", marginBottom: 16 }} />
        <p style={s}>{right.subheading}</p>
        <p style={c}>{right.caption}</p>
      </div>
    </div>
  );
}

export default function BeeFeeder() {
  return (
    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,sans-serif", color: "#1D1D1F", padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>

      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", color: "#86868B", marginBottom: 12 }}>
        Parametric Product Design · Environmental Design
      </p>
      <h1 style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1.05, marginBottom: 16 }}>
        Bee Feeder
      </h1>
      <p style={{ fontSize: 19, color: "#6E6E73", marginBottom: 16, maxWidth: 600 }}>
        Parametric Butterfly and Bee Feeder
      </p>
      <p style={{ fontSize: 16, color: "#6E6E73", marginBottom: 64, maxWidth: 600, lineHeight: 1.6 }}>
        Journey mapping for pollinators revealed they navigate using UV light ... not a visible colour. That single biological insight redirected the entire product scope from aesthetic to functional design. 
        This Bee-feeder could be placed in gardens, flower pots on a balcony, or on pavement soil. It helps as bridge to reduce distance between real flowers.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, maxWidth: 480, marginBottom: 80 }}>
        {[
          { value: "Parametric", label: "design system" },
          { value: "UV-guided",  label: "Animal User Experience" },
          { value: "3D Printed", label: "Functional Product" },
        ].map(({ value, label }) => (
          <div key={label} style={{ background: "#F5F5F7", borderRadius: 10, padding: "14px 16px" }}>
            <span style={{ display: "block", fontSize: 20, fontWeight: 600, color: "#1D1D1F", marginBottom: 2 }}>{value}</span>
            <span style={{ fontSize: 12, color: "#86868B" }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>

        <Block
          src={img1}
          subheading="Project Overview"
          caption="Pollinators are losing access to nectar in urban environments. This feeder mimics nature... it improves on it. By combining biological research, parametric modelling, and UV-guided visual design, the result is a functional object that works for insects as primary user group, and humans looking at it as secondary users."
        />

        <SideBySide
          left={{
            src: img2,
            subheading: "Studying Real Flowers",
            caption: "Yellow coneflowers were the reference point. Measured for petal geometry, flower diameter, and center proportions. Natural dimensions became parametric inputs, more than decorative references.",
          }}
          right={{
            src: img3,
            subheading: "The UV Insight",
            caption: "Butterflies see ultraviolet light invisible to humans. Real flowers use UV patterns as landing guides. UV paint applied to the feeder makes it recognisable to pollinators at distance. THIS invisible intervention, measurable impact!!!",
          }}
        />

        <SideBySide
          left={{
            src: img4a,
            subheading: "Parametric Model — View A",
            caption: "Built in Blender Software (It's free :) with fully editable parameters: petal count, length, angle, bowl diameter, and overall scale. Every dimension is a variable... changing one updates the version.",
          }}
          right={{
            src: img4b,
            subheading: "Parametric Model — View B",
            caption: "The same model from a different angle showing how petal geometry and bowl depth relate.",
          }}
        />

        <SideBySide
          left={{
            src: img5a,
            subheading: "Exploded View",
            caption: "Three components: outer petal structure, centre bowl, and removable sponge insert. The 21mm bowl holds sugar water via sponge... safer and cleaner than open nectar pools that attract contamination.",
          }}
          right={{
            src: img5b,
            subheading: "Feeding Geometry",
            caption: "Petals widened beyond natural proportions for easier landing surfaces. The centre bowl deepened to prevent spillage in wind. Every deviation from nature was deliberate and tested.",
          }}
        />

        <Block
          src={img6}
          src={img4c}
          subheading="Parametric Exploration"
          caption="Twelve variations tested across petal spacing, length, flower diameter, and bowl depth. Parametric design compressed weeks of iteration into hours . Each A/B testing changed independently while the product progressed."
        />

        <SideBySide
          left={{
            src: img7a,
            subheading: "STL Export",
            caption: "Final geometry exported as STL. Wall thickness, petal overhang angles, and bowl tolerances all reviewed for printability before slicing.",
          }}
          right={{
            src: img7b,
            subheading: "3D Printed Prototype",
            caption: "First physical prototype revealed petal flex under load and confirmed bowl volume. Printing exposed what parametric modelling couldn't... material behaviour at scale.",
          }}
        />

        <Block
          src={img8}
          subheading="Final Design"
          caption="The finished feeder integrates UV guidance, optimised landing geometry, and a contained feeding system into a single printable object. It looks like a flower. It works like precision engineering."
        />

        <Block
          src={img9}
          subheading="Reflection"
          caption="Parametric design changed how I think about iteration. When dimensions are relationships rather than fixed values, exploration becomes systematic. The UV insight derived from biological research, not aesthetic preference.. is what separates this from a decorative object. Design that works for its user, even when the user is a butterfly."
        />

      </div>

      <div style={{ borderTop: "0.5px solid rgba(0,0,0,0.10)", paddingTop: 40, marginTop: 80, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40 }}>
        {[
          { label: "Type",  value: "Parametric Product Design" },
          { label: "Tools", value: "Blender · SolidWorks · 3D Printing" },
          { label: "Focus", value: "Bio-inspired Design · Pollinator Health" },
        ].map(({ label, value }) => (
          <div key={label}>
            <p style={{ fontSize: 11, color: "#86868B", marginBottom: 4 }}>{label}</p>
            <p style={{ fontSize: 14, fontWeight: 500 }}>{value}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
