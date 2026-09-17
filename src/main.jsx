import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, CarFront, Check, Crown, HeartHandshake, MapPin, Menu, Mountain, Music2, PartyPopper, ShieldCheck, Sparkles, Trophy, X } from 'lucide-react'
import './styles.css'
import { SEROSE_CONFIG } from './config'

const assetUrl = (fileName) => `${import.meta.env.BASE_URL}${fileName}`

const experiences = [
  { icon: PartyPopper, title: 'Bachelor & Bachelorette', copy: 'Curated group celebrations built around your pace, interests and budget.' },
  { icon: Music2, title: 'Nightlife Experiences', copy: 'One stop or four. Tell us your vibe and we help shape the night.' },
  { icon: Trophy, title: 'Golf & Day Experiences', copy: 'Golf, brunch, resort days, city outings and custom daytime plans.' },
  { icon: MapPin, title: 'Reno City Experiences', copy: 'A local-first way to experience Reno without guessing where to start.' },
  { icon: CarFront, title: 'Transportation Coordination', copy: 'We coordinate with properly licensed transportation providers when requested.' },
  { icon: Crown, title: 'VIP Concierge Planning', copy: 'Reservations, itineraries, group coordination and personalized recommendations.' },
]
const clubPlans = [
  { n:1, title:'ONE STOP', sub:'One destination. Settle in and enjoy the night.', time:'Focused' },
  { n:2, title:'TWO STOPS', sub:'Start polished. Finish with more energy.', time:'Balanced' },
  { n:3, title:'THREE STOPS', sub:'Experience multiple sides of Reno nightlife.', time:'Full Night' },
  { n:4, title:'FOUR STOPS', sub:'The complete club-hopping experience.', time:'All Out' },
]
const vibes = ['Luxury','Hip-Hop / R&B','Dance','Latin','Lounge','Mixed','Surprise Us']
const occasions = ['Bachelor Party','Bachelorette Party','Birthday','Couples Night','Friends Trip','Corporate Group','Vacation','Special Occasion','Other']
const budgets = ['$75–$125','$125–$200','$200–$300','$300–$500','$500+']
const dayExperiences = ['Golf','Brunch','Pool / Resort Day','Spa','Shopping','Lake Tahoe','Outdoor Activities','Dining','City Exploration','Casino Experience','Special Event','Custom Activity']

function SectionTitle({eyebrow,title,copy}) {
  return <div className="section-title"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>
}

function App(){
  const [menuOpen,setMenuOpen]=useState(false)
  const [clubs,setClubs]=useState(2)
  const [vibe,setVibe]=useState('Luxury')
  const [occasion,setOccasion]=useState('Bachelorette Party')
  const [budget,setBudget]=useState('$200–$300')
  const [transport,setTransport]=useState(true)
  const [vip,setVip]=useState(true)
  const [dayPlans,setDayPlans]=useState([])
  const [golf,setGolf]=useState('Maybe')
  const [dinner,setDinner]=useState('Maybe')
  const [submitted,setSubmitted]=useState(false)
  const selectedClub=useMemo(()=>clubPlans.find(p=>p.n===clubs),[clubs])
  const scrollTo=(id)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenuOpen(false)}
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const form=e.currentTarget
    const requestFields={
      ...Object.fromEntries(new FormData(form).entries()),
      nightlifeExperience:`${clubs} ${clubs===1?'Club':'Clubs'}`,
      preferredVibe:vibe,
      occasion,
      budgetPerPerson:budget,
      transportationNeeded:transport?'Yes':'No',
      vipTableInterest:vip?'Yes':'No',
      daytimeExperiences:dayPlans.join(', ') || 'None selected',
      golfInterest:golf,
      dinnerInterest:dinner,
      ageAcknowledgment:'Yes',
      privacyConsent:'Yes',
      serviceAvailabilityAcknowledgment:'Yes',
      guestConductAgreement:'Yes',
    }
    if(!SEROSE_CONFIG.googleFormAction && !SEROSE_CONFIG.formEndpoint){
      setSubmitted('setup')
      setTimeout(()=>setSubmitted(false),7000)
      return
    }
    try{
      if(SEROSE_CONFIG.googleFormAction){
        const data=new URLSearchParams()
        Object.entries(SEROSE_CONFIG.googleFormEntries).forEach(([field,entry])=>{
          if(!entry || requestFields[field] === undefined) return
          if(field==='date' && /^\d{4}-\d{2}-\d{2}$/.test(String(requestFields[field]))){
            const [year,month,day]=String(requestFields[field]).split('-')
            data.append(`${entry}_year`,year)
            data.append(`${entry}_month`,month)
            data.append(`${entry}_day`,day)
            return
          }
          data.append(entry,String(requestFields[field]))
        })
        await fetch(SEROSE_CONFIG.googleFormAction,{method:'POST',body:data,mode:'no-cors'})
      }else{
        const data=new FormData()
        Object.entries(requestFields).forEach(([field,value])=>data.append(field,String(value)))
        const res=await fetch(SEROSE_CONFIG.formEndpoint,{method:'POST',body:data,headers:{Accept:'application/json'}})
        if(!res.ok) throw new Error('Submit failed')
      }
      setSubmitted('sent')
      form.reset()
      setTimeout(()=>setSubmitted(false),7000)
    }catch(err){
      setSubmitted('error')
      setTimeout(()=>setSubmitted(false),7000)
    }
  }

  return <div className="site-shell">
    <header className="nav-wrap"><div className="container nav">
      <button className="brand" onClick={()=>scrollTo('home')} aria-label="SEROSE home"><img className="logo-img" src={assetUrl('serose-logo.png')} alt="SEROSE"/><small>EXPERIENCES BEYOND ORDINARY</small></button>
      <nav className={menuOpen?'nav-links open':'nav-links'}>
        {[[ 'experiences','Experiences'],['night','Build Your Night'],['reno','Reno'],['how','How It Works'],['about','About']].map(([id,label])=><button key={id} onClick={()=>scrollTo(id)}>{label}</button>)}
      </nav>
      <button className="plan-btn desktop" onClick={()=>scrollTo('plan')}>Plan Your Experience <ArrowRight size={16}/></button>
      <button className="mobile-menu" onClick={()=>setMenuOpen(v=>!v)} aria-label="menu">{menuOpen?<X/>:<Menu/>}</button>
    </div></header>

    <main>
      <section id="home" className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
          <span className="eyebrow"><MapPin size={15}/> RENO, NEVADA</span>
          <h1>NEVADA NIGHTS,<br/><em>ELEVATED.</em></h1>
          <p>Curated nightlife, group celebrations, golf outings, city experiences and VIP-style hospitality throughout Reno and select Nevada destinations.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={()=>scrollTo('night')}>Build Your Night <ArrowRight size={18}/></button>
            <button className="btn-secondary" onClick={()=>scrollTo('experiences')}>Explore Experiences</button>
          </div>
          <div className="trust-row"><span><ShieldCheck/> Professional</span><span><HeartHandshake/> Hospitality-first</span><span><Sparkles/> Custom planned</span></div>
          </div>
          <div className="hero-card-wrap">
            <div className="hero-photo-card">
              <img src={assetUrl('reno-nightlife.jpg')} alt="Reno nightlife experience"/>
              <div className="photo-shade"></div>
              <div className="photo-copy"><span>RENO AFTER DARK</span><strong>Good People.<br/>Great Nights.</strong></div>
            </div>
            <div className="hero-card">
              <div className="rose-orbit"><img className="rose-mark" src={assetUrl('serose-logo.png')} alt="SEROSE rose mark"/></div><span className="mini-label">THE SEROSE EXPERIENCE</span>
              <h3>People. Places.<br/>Possibilities.</h3>
                  <div className="mini-grid"><div><Music2/><span>Nightlife</span></div><div><Trophy/><span>Golf</span></div><div><Mountain/><span>Day Trips</span></div><div><CarFront/><span>Transport</span></div></div>
              <div className="card-note">Good people. Great places. Unforgettable nights.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="experiences" className="section dark-section"><div className="container">
        <SectionTitle eyebrow="WHAT WE CREATE" title="Your Trip. Your Pace. Your Experience." copy="SEROSE is built around the experience you want — not a one-size-fits-all package."/>
        <div className="experience-grid">{experiences.map(({icon:Icon,title,copy})=><article className="experience-card" key={title}>
          <div className="icon-box"><Icon/></div><h3>{title}</h3><p>{copy}</p><button onClick={()=>scrollTo(title.includes('Nightlife')?'night':'plan')}>Explore <ArrowRight size={15}/></button>
        </article>)}</div>
      </div></section>

      <section id="night" className="section planner-section"><div className="container">
        <SectionTitle eyebrow="SIGNATURE EXPERIENCE" title="Build Your Night" copy="One stop or four — tell us how you want the night to feel, and we’ll build the plan around your group."/>
        <div className="notice-band"><ShieldCheck/><div><strong>Nightlife rules apply.</strong><p>Nightlife experiences involving 21+ venues require valid government-issued identification. Individual venue age rules apply. Admission is never guaranteed and remains subject to venue capacity, dress code, security policies and management discretion.</p></div></div>
        <div className="club-grid">{clubPlans.map(plan=><button key={plan.n} onClick={()=>setClubs(plan.n)} className={clubs===plan.n?'club-card active':'club-card'}>
          <div className="club-num">0{plan.n}</div><span className="club-time">{plan.time}</span><h3>{plan.title}</h3><p>{plan.sub}</p>
          <span className="select-state">{clubs===plan.n?<><Check size={15}/> Selected</>:'Select experience'}</span>
        </button>)}</div>
        <div className="planner-panel">
          <div><span className="field-label">WHAT'S YOUR VIBE?</span><div className="chips">{vibes.map(v=><button key={v} className={vibe===v?'chip active':'chip'} onClick={()=>setVibe(v)}>{v}</button>)}</div></div>
          <div className="summary-card"><span>YOUR NIGHT</span><h3>{selectedClub.title}</h3><p>{vibe} • {selectedClub.time}</p><button className="btn-primary full" onClick={()=>scrollTo('plan')}>Continue Planning <ArrowRight size={17}/></button></div>
        </div>
      </div></section>

      <section id="reno" className="section reno-section"><div className="container split">
        <div><SectionTitle eyebrow="LOCAL KNOWLEDGE" title="Experience Reno Without Guessing." copy="From daytime outings to nightlife, SEROSE helps groups create a smooth itinerary based on the type of trip they actually want."/>
          <div className="feature-list"><div><Check/> Downtown & Midtown experiences</div><div><Check/> Golf, brunch and day plans</div><div><Check/> Nightlife and lounge planning</div><div><Check/> Lake Tahoe add-on experiences</div><div><Check/> Group-friendly itineraries</div></div>
          <button className="btn-secondary light" onClick={()=>scrollTo('plan')}>Plan A Reno Experience</button>
        </div>
        <div className="reno-art"><div className="mountain-line">⛰</div><div className="reno-sign">RENO</div><div className="reno-sub">THE BIGGEST LITTLE CITY</div></div>
      </div></section>

      <section id="how" className="section dark-section"><div className="container">
        <SectionTitle eyebrow="SIMPLE BY DESIGN" title="How SEROSE Works"/>
        <div className="steps">{[
          ['01','Tell us the occasion','Choose your group, date and the kind of trip you want.'],
          ['02','Choose the experience','Nightlife, golf, city plans, day activities or a mix.'],
          ['03','Set your preferences','Group size, budget, transportation, VIP interest and vibe.'],
          ['04','We shape the plan','SEROSE creates a personalized itinerary around your request.'],
          ['05','Confirm & enjoy','Finalize the details, then show up ready to enjoy Reno.'],
        ].map(([n,t,c])=><div className="step" key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></div>)}</div>
      </div></section>

      <section id="about" className="section about-section"><div className="container split">
        <div className="about-copy"><SectionTitle eyebrow="ABOUT SEROSE" title="Hospitality First. Always Professional." copy="SEROSE is a social-experience and concierge brand focused on curated group outings, hospitality, nightlife planning and local experiences."/>
          <p>SEROSE hosts and concierges are there to help coordinate, guide and improve the guest experience. SEROSE does not offer sexual services and is not an escort service.</p>
          <p>Venue admission, alcohol service, reservations and transportation remain subject to each venue, licensed provider and applicable law.</p>
        </div>
        <div className="values-card"><ShieldCheck size={34}/><h3>Professional Standards</h3><ul><li><Check/> Clear expectations</li><li><Check/> Respectful guest conduct</li><li><Check/> Licensed providers where required</li><li><Check/> No sexual services</li><li><Check/> Venue policies always apply</li></ul></div>
      </div></section>

      <section id="standards" className="section standards-section"><div className="container">
        <SectionTitle eyebrow="PROFESSIONAL STANDARDS" title="Hospitality, Not Access." copy="SEROSE is a hospitality, concierge and social-experience company. SEROSE Experience Hosts assist with itinerary coordination, guest support, reservations, venue communication and group logistics. SEROSE does not offer prostitution or sexual services."/>
        <div className="standards-grid">
          <article><span className="eyebrow">EXPERIENCE HOSTS</span><h3>Professional Guest Support</h3><p>SEROSE Experience Hosts are hospitality professionals who may assist with check-in, itinerary timing, venue communication, reservations, group organization and guest support.</p></article>
          <article><span className="eyebrow">STANDARD HOSTING</span><h3>Public Or Commercial Settings</h3><p>Standard SEROSE hosting and concierge services take place in public or commercial hospitality settings. Standard host services do not include private hotel-room or residential companionship.</p></article>
          <article><span className="eyebrow">BOUNDARIES</span><h3>Respect Is Required</h3><p>Guests must treat SEROSE staff, hosts, venue employees, drivers and other guests respectfully. Harassment, threats, unwanted touching, sexual solicitation or unsafe conduct may end the experience immediately.</p></article>
          <article><span className="eyebrow">HOST SAFETY</span><h3>Assignments Can End</h3><p>SEROSE may end an assignment at any time if staff reasonably believe the environment has become unsafe, threatening or inappropriate.</p></article>
        </div>
        <div className="jurisdiction-note"><strong>Service-area limits</strong><p>Services are available only where permitted by applicable state and local law. Service availability may vary by city, county, venue and activity. Reno, Sparks and unincorporated Washoe County may have different requirements.</p></div>
      </div></section>

      <section id="private-entertainment" className="section private-section"><div className="container split">
        <div><SectionTitle eyebrow="SEPARATE REQUEST PATH" title="Private Entertainment — Available by Request" copy="Private entertainment requests are reviewed individually and may only be confirmed where the performer, venue and activity comply with applicable licensing and local requirements."/>
          <p className="private-copy">Private entertainment is not included in standard nightlife packages or the Build Your Night flow. A request is not an approval or booking. The performer, property owner, venue, licensing requirements and local jurisdiction must all be considered before anything is confirmed.</p>
          <button className="btn-primary" onClick={()=>scrollTo('plan')}>Submit A Review Request <ArrowRight size={18}/></button>
        </div>
        <div className="private-boundary"><ShieldCheck size={32}/><h3>Reviewed Separately</h3><p>No sexual services are offered. SEROSE will decline requests that cannot be lawfully and safely provided.</p></div>
      </div></section>

      <section id="plan" className="section form-section"><div className="container">
        <SectionTitle eyebrow="START HERE" title="Plan Your SEROSE Experience" copy="Tell us what you want. We’ll use this to shape the right experience for your group."/>
        <form className="plan-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label><span>Name</span><input required name="name" placeholder="Your name"/></label>
            <label><span>Phone</span><input required name="phone" type="tel" placeholder="(775) 555-0000"/></label>
            <label><span>Email</span><input required name="email" type="email" placeholder="you@example.com"/></label>
            <label><span>Date</span><input required name="date" type="date"/></label>
            <label><span>Occasion</span><select value={occasion} onChange={e=>setOccasion(e.target.value)}>{occasions.map(o=><option key={o}>{o}</option>)}</select></label>
            <label><span>Group Size</span><input name="groupSize" type="number" min="1" placeholder="8"/></label>

            <div className="field full-span"><span>Nightlife Experience</span><div className="compact-options">{clubPlans.map(p=><button type="button" key={p.n} onClick={()=>setClubs(p.n)} className={clubs===p.n?'compact active':'compact'}>{p.n} {p.n===1?'Club':'Clubs'}</button>)}</div></div>
            <div className="field full-span"><span>Preferred Vibe</span><div className="chips">{vibes.map(v=><button type="button" key={v} onClick={()=>setVibe(v)} className={vibe===v?'chip active':'chip'}>{v}</button>)}</div></div>
            <div className="field full-span"><span>Daytime Experiences</span><div className="chips">{dayExperiences.map(activity=><button type="button" key={activity} onClick={()=>setDayPlans(current=>current.includes(activity)?current.filter(item=>item!==activity):[...current,activity])} className={dayPlans.includes(activity)?'chip active':'chip'}>{dayPlans.includes(activity)&&<Check size={14}/>} {activity}</button>)}</div></div>
            <label><span>Budget Per Person</span><select value={budget} onChange={e=>setBudget(e.target.value)}>{budgets.map(b=><option key={b}>{b}</option>)}</select></label>
            <label><span>Golf Interest</span><select name="golfInterest" value={golf} onChange={e=>setGolf(e.target.value)}><option>Yes</option><option>No</option><option>Maybe</option></select></label>
            <label><span>Dinner Interest</span><select name="dinnerInterest" value={dinner} onChange={e=>setDinner(e.target.value)}><option>Yes</option><option>No</option><option>Maybe</option></select></label>
            <div className="toggle-stack">
              <button type="button" aria-pressed={transport} className={transport?'toggle on':'toggle'} onClick={()=>setTransport(v=>!v)}><CarFront/> Transportation Coordination <span>{transport?'YES':'NO'}</span></button>
              <button type="button" aria-pressed={vip} className={vip?'toggle on':'toggle'} onClick={()=>setVip(v=>!v)}><Crown/> VIP Interest <span>{vip?'YES':'NO'}</span></button>
            </div>
            <label className="full-span"><span>Hotel / Starting Location</span><input name="hotel" autoComplete="street-address" placeholder="Hotel or general area"/></label>
            <label className="full-span"><span>Special Requests</span><textarea name="notes" rows="5" placeholder="Golf? Brunch? Birthday? Dinner? Photos? Tell us what would make the trip memorable."/></label>
          </div>
          <div className="consent-block">
            <label className="consent"><input required type="checkbox" name="ageAcknowledgment"/><span>I understand that nightlife venues may require guests to be 21+, valid government-issued ID, and compliance with each venue's entry rules.</span></label>
            <label className="consent"><input required type="checkbox" name="privacyConsent"/><span>I agree that SEROSE may use the information I provide to respond to this experience request.</span></label>
            <label className="consent"><input required type="checkbox" name="serviceAvailabilityAcknowledgment"/><span>I understand that requested activities may be modified or declined based on venue policy, licensing requirements, local law or provider availability.</span></label>
            <label className="consent"><input required type="checkbox" name="guestConductAgreement"/><span>I agree to treat SEROSE staff, hosts, venue employees, drivers and other guests respectfully. Harassment, threats, unwanted touching, sexual solicitation or unsafe conduct are not allowed.</span></label>
            <p>Submitting a request does not create a confirmed booking, reservation, guarantee of admission, confirmed pricing, or guaranteed availability. SEROSE reviews each request for availability, legality, venue requirements and service fit before confirmation.</p>
          </div>
          <div className="form-footer"><div className="request-summary"><span>REQUEST SUMMARY</span><strong>{occasion} • {clubs} {clubs===1?'Club':'Clubs'} • {vibe} • {budget}</strong></div><div className="submit-wrap"><button className="btn-primary submit" type="submit">Request My SEROSE Experience <ArrowRight size={18}/></button><p className="booking-note">SEROSE provides professional hospitality and experience coordination. No sexual services are offered. Certain entertainment, transportation and venue services are provided only where legally permitted and properly licensed.</p></div></div>
          {submitted==='sent'&&<div className="success"><Check/> Request sent. SEROSE can now follow up with the guest.</div>}
          {submitted==='setup'&&<div className="success setup"><Check/> The form is built and ready. Add the Google Form action and entry mappings in <b>src/config.js</b> to start receiving requests.</div>}
          {submitted==='error'&&<div className="success error">We couldn't send the request. Please try again or contact SEROSE directly.</div>}
        </form>
      </div></section>

      <section id="policies" className="section legal-strip"><div className="container legal-grid"><ShieldCheck/><div><strong>Professional social experiences only.</strong><p>SEROSE provides professional hospitality and experience coordination. No sexual services are offered. Certain entertainment, transportation and venue services are provided only where legally permitted and properly licensed.</p><p>Transportation is coordinated with properly authorized third-party providers. SEROSE does not operate as a passenger carrier unless separately licensed to do so. Alcohol is sold and served only by appropriately licensed venues or providers. SEROSE does not sell or serve alcohol as part of its concierge service.</p></div></div></section>
      <section className="section policy-section"><div className="container policy-grid">
        <article id="terms"><span className="eyebrow">TERMS</span><h3>Experience Requests</h3><p>A request is an inquiry only. SEROSE must confirm the itinerary, pricing, availability, venue requirements, and any third-party services before a booking exists. Guests remain responsible for truthful information, lawful conduct, venue rules, and charges accepted with confirmed providers.</p></article>
        <article id="privacy"><span className="eyebrow">PRIVACY</span><h3>Information You Provide</h3><p>SEROSE uses submitted contact and planning information to respond to requests, prepare recommendations, coordinate confirmed services, and communicate about the inquiry. Do not submit sensitive personal information through this form. Requests may be processed by Formspree and other service providers used to operate the website.</p></article>
        <article id="cancellation"><span className="eyebrow">CANCELLATION</span><h3>Provider Terms Apply</h3><p>Cancellation, refund, deposit, and rescheduling terms must be disclosed before a guest accepts a paid proposal. Third-party venues, transportation providers, and activity operators may have separate policies. No payment is collected through this launch form.</p></article>
        <article id="conduct"><span className="eyebrow">CONDUCT</span><h3>Respect Is Required</h3><p>Guests must behave respectfully and follow applicable law and venue policies. Harassment, threats, unwanted touching, sexual solicitation, illegal activity, or inappropriate conduct can end an experience without further coordination. SEROSE hosts are hospitality professionals and do not provide sexual services.</p></article>
        <article id="refunds"><span className="eyebrow">REFUNDS</span><h3>No Payment At Inquiry</h3><p>No payment is collected through this launch form. Any deposit, refund, rescheduling or cancellation terms will be disclosed in writing before a guest accepts a paid proposal.</p></article>
        <article id="host-conduct"><span className="eyebrow">HOST CONDUCT</span><h3>Professional Boundaries</h3><p>SEROSE hosts support hospitality experiences and must follow applicable law, venue policies, safety procedures and professional boundaries. Host services do not include sexual services.</p></article>
        <article id="transportation"><span className="eyebrow">TRANSPORTATION</span><h3>Third-Party Providers</h3><p>SEROSE does not operate as a passenger carrier unless separately licensed to do so. Transportation requested through SEROSE is coordinated with properly authorized third-party providers.</p></article>
        <article id="venue-admission"><span className="eyebrow">VENUE ADMISSION</span><h3>Venue Control</h3><p>Nightclub, lounge and venue admission is never guaranteed. Entry remains subject to capacity, dress code, age and identification requirements, security policies and management discretion.</p></article>
        <article id="alcohol"><span className="eyebrow">ALCOHOL</span><h3>Licensed Service Only</h3><p>Alcohol is sold and served only by appropriately licensed venues or providers. SEROSE does not sell or serve alcohol as part of its concierge service.</p></article>
        <article id="private-disclosure"><span className="eyebrow">PRIVATE ENTERTAINMENT</span><h3>Separate Review</h3><p>Private entertainment requests are reviewed individually and may only be confirmed where the performer, venue and activity comply with applicable licensing, venue rules and local law.</p></article>
        <article id="gratuity"><span className="eyebrow">GRATUITY</span><h3>Optional Hospitality Tip</h3><p>Gratuities for hospitality service are optional. A gratuity does not purchase additional, private, romantic or sexual services.</p></article>
        <article id="jurisdiction"><span className="eyebrow">JURISDICTION</span><h3>Location Matters</h3><p>Reno, Sparks and unincorporated Washoe County may have different rules. Services are available only where permitted by applicable state and local law.</p></article>
      </div></section>
    </main>

    <footer><div className="container footer-grid">
      <div><img className="logo-img footer-logo" src={assetUrl('serose-logo.png')} alt="SEROSE"/><p>Experiences Beyond Ordinary.</p></div>
      <div><strong>Explore</strong><button onClick={()=>scrollTo('experiences')}>Experiences</button><button onClick={()=>scrollTo('night')}>Build Your Night</button><button onClick={()=>scrollTo('reno')}>Reno</button></div>
      <div><strong>Company</strong><button onClick={()=>scrollTo('about')}>About</button><button onClick={()=>scrollTo('standards')}>Professional Standards</button><button onClick={()=>scrollTo('private-entertainment')}>Private Entertainment</button><button onClick={()=>scrollTo('plan')}>Plan Your Experience</button><button onClick={()=>scrollTo('policies')}>Legal / Compliance</button><a className="contact-link" href={`mailto:${SEROSE_CONFIG.contactEmail}`}>{SEROSE_CONFIG.contactEmail}</a><span>SEROSE — Reno, Nevada</span><small>Legal entity and license information will be posted once finalized and verified.</small></div>
    </div><div className="container footer-bottom"><span>© 2026 SEROSE. All rights reserved.</span><span>Hospitality • Experiences • Concierge</span></div></footer>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>)
