"use client";

import { RadioTower, ArrowRight } from "lucide-react";

export default function BannerAd() {
  return (
    <section className="ba-section">
      <div className="ba-inner">
        <div className="ba-text">
          <p className="ba-label">
            <RadioTower size={14} /> Sponsored
          </p>
          <h3 className="ba-title">ਆਕਾਲ ਬਾਣੀ Live App Now Available</h3>
          <p className="ba-desc">Fast notifications, video bulletins, and district-wise alerts in one place.</p>
        </div>
        <button className="ba-btn">
          Download Now <ArrowRight size={16} />
        </button>
      </div>

      <style jsx>{`
        .ba-section {
          margin-bottom: 2.5rem;
          border-radius: 10px;
          overflow: hidden;
          background: linear-gradient(135deg, #f9f6f0 0%, #f0eade 100%);
          border: 1px solid #e8e3da;
        }

        .ba-inner {
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .ba-label {
          margin: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 11px;
          color: var(--primary);
        }

        .ba-title {
          margin: 0.35rem 0;
          font-family: var(--font-heading), serif;
          font-size: clamp(18px, 2.5vw, 24px);
          color: #1f1c1a;
        }

        .ba-desc {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .ba-btn {
          border: none;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0.7rem 1.25rem;
          color: #fff;
          background: var(--primary);
          font-size: 14px;
          font-family: inherit;
          white-space: nowrap;
          transition: opacity 0.15s;
        }

        .ba-btn:hover {
          opacity: 0.9;
        }

        @media (max-width: 600px) {
          .ba-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .ba-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
