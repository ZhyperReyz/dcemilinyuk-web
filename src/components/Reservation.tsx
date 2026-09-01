import { useTextReveal, useScrollReveal } from '../hooks/useScrollReveal'
import './Reservation.css'

export default function Reservation() {
  const titleRef = useTextReveal()
  const formRef = useScrollReveal({ stagger: 0.1, y: 30 })

  return (
    <section className="reservation section" id="reservation">
      <div className="reservation__bg" />
      <div className="container">
        <div className="reservation__grid">
          <div className="reservation__info">
            <div ref={titleRef} className="reservation__title heading-lg">
              <span className="text-line">Reserve</span>
              <span className="text-line">Your <em>Spot</em></span>
            </div>
            <p className="text-body reservation__desc reveal-child">
              Whether it's a quiet morning alone or a gathering with friends,
              we'll have a table ready for you. Reservations recommended for
              parties of 4+.
            </p>
            <div className="reservation__details reveal-child">
              <div className="reservation__detail">
                <span className="text-sm">Phone</span>
                <span className="text-body">+1 (555) 024-7891</span>
              </div>
              <div className="reservation__detail">
                <span className="text-sm">Email</span>
                <span className="text-body">hello@urjacoffee.co</span>
              </div>
              <div className="reservation__detail">
                <span className="text-sm">Walk-ins</span>
                <span className="text-body">Always welcome</span>
              </div>
            </div>
          </div>

          <form ref={formRef} className="reservation__form" onSubmit={(e) => e.preventDefault()}>
            <div className="res-field reveal-child">
              <label className="text-sm" htmlFor="res-name">Full Name</label>
              <input type="text" id="res-name" placeholder="John Doe" className="form-input" />
            </div>
            <div className="res-field reveal-child">
              <label className="text-sm" htmlFor="res-email">Email</label>
              <input type="email" id="res-email" placeholder="john@email.com" className="form-input" />
            </div>
            <div className="res-row">
              <div className="res-field reveal-child">
                <label className="text-sm" htmlFor="res-date">Date</label>
                <input type="date" id="res-date" className="form-input" />
              </div>
              <div className="res-field reveal-child">
                <label className="text-sm" htmlFor="res-time">Time</label>
                <select id="res-time" className="form-input form-select">
                  <option value="">Select time</option>
                  <option>7:00 AM</option>
                  <option>8:00 AM</option>
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                  <option>5:00 PM</option>
                  <option>6:00 PM</option>
                  <option>7:00 PM</option>
                  <option>8:00 PM</option>
                </select>
              </div>
            </div>
            <div className="res-row">
              <div className="res-field reveal-child">
                <label className="text-sm" htmlFor="res-guests">Guests</label>
                <select id="res-guests" className="form-input form-select">
                  <option>1 Person</option>
                  <option>2 People</option>
                  <option>3 People</option>
                  <option>4 People</option>
                  <option>5+ People</option>
                </select>
              </div>
              <div className="res-field reveal-child">
                <label className="text-sm" htmlFor="res-occasion">Occasion</label>
                <select id="res-occasion" className="form-input form-select">
                  <option value="">None</option>
                  <option>Birthday</option>
                  <option>Anniversary</option>
                  <option>Business</option>
                  <option>Date</option>
                </select>
              </div>
            </div>
            <div className="res-field reveal-child">
              <label className="text-sm" htmlFor="res-notes">Special Requests</label>
              <textarea id="res-notes" rows={3} placeholder="Dietary needs, seating preference, etc." className="form-input form-textarea" />
            </div>
            <button type="submit" className="btn-primary reveal-child" style={{ width: '100%', justifyContent: 'center' }}>
              <span>Confirm Reservation</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
