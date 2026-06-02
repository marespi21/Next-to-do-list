"use client";

import { useEffect, useState } from "react";
import "../styles/Card.css";

interface CardProps {
  description: string;
  state: "pending" | "inProgress" | "done";
  startDate: number | undefined;
  endDate: number | undefined;
  id: string;
  handleStart: (id: string) => void;
  handleEnd: (id: string) => void;
  handleDelete: (id: string) => void;
}

function formatRelativeTime(timestamp: number): string {
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 60) return "ahora";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `hace ${diffMin}m`;
  const diffHr = Math.floor(diffMin / 60);
  return `hace ${diffHr}h`;
}

function formatDuration(start: number, end: number): string {
  const sec = Math.floor((end - start) / 1000);
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  const remSec = sec % 60;
  return remSec > 0 ? `${min}m ${remSec}s` : `${min}m`;
}

export const Card = ({
  description,
  state,
  startDate,
  endDate,
  id,
  handleStart,
  handleEnd,
  handleDelete,
}: CardProps) => {
  const [timeInProgress, setTimeInProgress] = useState("");

  useEffect(() => {
    if (!startDate || state !== "inProgress") {
      return;
    }
    const update = () => {
      const diffTime = Date.now() - startDate;
      const diffFormated = new Date(diffTime).toISOString();
      setTimeInProgress(diffFormated.slice(11, 19));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startDate, state]);

  return (
    <div
      className={`card2 ${state === "inProgress" ? "card-ip" : ""} ${state === "done" ? "card-done" : ""}`}
    >
      {state === "done" && (
        <span className="card-checkbox" aria-hidden>
          ✓
        </span>
      )}

      <div className="card-content">
        <div className="card-title">{description}</div>

        {state === "inProgress" && startDate && (
          <div className="card-meta">
            <span className="card-meta-time">en curso</span>
            <span className="card-meta-duration">
              <span className="card-clock" aria-hidden />
              {timeInProgress}
            </span>
          </div>
        )}

        {state === "done" && endDate && (
          <div className="card-meta">
            <span className="card-meta-time">
              {formatRelativeTime(endDate)}
            </span>
            {startDate && (
              <span className="card-meta-duration">
                <span className="card-clock" aria-hidden />
                {formatDuration(startDate, endDate)}
              </span>
            )}
          </div>
        )}

        {state === "pending" && (
          <button
            type="button"
            className="card-action"
            onClick={() => {
              handleStart(id);
            }}
          >
            Iniciar tarea
          </button>
        )}

        {state === "inProgress" && (
          <button
            type="button"
            className="card-action card-action--primary"
            onClick={() => {
              handleEnd(id);
            }}
          >
            Finalizar tarea
          </button>
        )}

        {state === "done" && (
          <button
            type="button"
            className="card-action card-action--ghost"
            onClick={() => {
              handleDelete(id);
            }}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
