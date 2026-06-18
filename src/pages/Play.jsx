import p1 from "../assets/p1.webp";
import p2 from "../assets/p2.webp";
import p3 from "../assets/p3.webp";
import p4 from "../assets/p4.webp";
import p5 from "../assets/p5.webp";
import p6 from "../assets/p6.webp";
import p7 from "../assets/p7.webp";
import p8 from "../assets/p8.webp";
import p9 from "../assets/p9.webp";

export default function Play() {
  const imgs = [p1,p2,p3,p4,p5,p6,p7,p8,p9];
  return (
    <div style={{padding:"80px 40px",fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",color:"#1D1D1F"}}>

      {/* HERO */}
      <p style={{fontSize:11,fontWeight:600,letterSpacing:"0.10em",textTransform:"uppercase",color:"#86868B",marginBottom:12}}>Creative practice</p>
      <h1 style={{fontSize:64,fontWeight:700,letterSpacing:"-0.5px",lineHeight:1.05,marginBottom:16}}>Play</h1>
      <p style={{fontSize:19,color:"#6E6E73",marginBottom:40}}>Independent design studio, 2019–2022.</p>

      {/* STATS */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,maxWidth:480,marginBottom:80}}>
        {[
          {value:"4",label:"completed projects"},
          {value:"3 yrs",label:"independent studio"},
          {value:"End-to-end",label:"design to handover"},
        ].map(({value,label})=>(
          <div key={label} style={{background:"#F5F5F7",borderRadius:10,padding:"14px 16px"}}>
            <span style={{display:"block",fontSize:22,fontWeight:600,color:"#1D1D1F",marginBottom:2}}>{value}</span>
            <span style={{fontSize:12,color:"#86868B"}}>{label}</span>
          </div>
        ))}
      </div>

      {/* GALLERY */}
      <div style={{columns:"2 300px",gap:12,marginBottom:80}}>
        {imgs.map((src,i)=>(
          <img key={i} src={src} alt="" style={{width:"100%",marginBottom:12,borderRadius:8,display:"block"}} />
        ))}
      </div>

      {/* FOOTER */}
      <div style={{borderTop:"0.5px solid rgba(0,0,0,0.10)",paddingTop:40,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:40}}>
        {[
          {label:"Work type",value:"Residential interiors"},
          {label:"Deliverables",value:"Plans · Procurement · Handover"},
          {label:"Location",value:"Bangalore, India"},
        ].map(({label,value})=>(
          <div key={label}>
            <p style={{fontSize:11,color:"#86868B",marginBottom:4}}>{label}</p>
            <p style={{fontSize:14,fontWeight:500}}>{value}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
