import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useTextReveal } from '../hooks/useScrollReveal'
import './Events.css'

const events = [
  {
    date: 'Sep 7',
    day: 'Saturday',
    title: 'Latte Art Workshop',
    desc: 'Learn the basics of pouring hearts, rosettas, and tulips with our head barista.',
    time: '10:00 AM — 12:00 PM',
    spots: '8 spots left',
    price: '$45',
  },
  {
    date: 'Sep 14',
    day: 'Saturday',
    title: 'Cupping Session',
    desc: 'Taste and compare 6 single-origin beans from 3 continents. All skill levels welcome.',
    time: '2:00 PM — 4:00 PM',
    spots: '12 spots left',
    price: '$30',
  },
  {
    date: 'Sep 21',
    day: 'Saturday',
    title: 'Home Brewing Class',
    desc: 'Master pour-over, AeroPress, and French press. Take home a bag of our house blend.',
    time: '11:00 AM — 1:00 PM',
    spots: '6 spots left',
    price: '$55',
  },
]

export default function Events() {
  const titleRef = useTextReveal()
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll('.event-card')
      if (!items) return
      gsap.set(items, { x: -40, opacity: 0 })
      gsap.to(items, {
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
      })
    }, listRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="events section" id="events">
      <div className="container">
        <div className="events__header">
          <div ref={titleRef} className="events__title heading-lg">
            <span className="text-line">Upcoming</span>
            <span className="text-line"><em>Events</em></span>
          </div>
          <a href="#" className="btn-outline events__view-all">View All Events</a>
        </div>

        <div ref={listRef} className="events__list">
          {events.map((event, i) => (
            <div key={i} className="event-card">
              <div className="event-card__date">
                <span className="event-card__date-day">{event.date.split(' ')[1]}</span>
                <span className="event-card__date-month">{event.date.split(' ')[0]}</span>
              </div>

              <div className="event-card__divider" />

              <div className="event-card__info">
                <span className="text-sm">{event.day} · {event.time}</span>
                <h3 className="event-card__title">{event.title}</h3>
                <p className="event-card__desc text-body">{event.desc}</p>
              </div>

              <div className="event-card__action">
                <span className="event-card__price">{event.price}</span>
                <span className="event-card__spots text-sm">{event.spots}</span>
                <button className="btn-primary btn-primary--sm">
                  <span>Reserve</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
