'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { getBookingsForDateRange, type Booking } from '@/lib/queries';
import { StatusBadge } from '@/components/admin/StatusBadge';

const TIME_SLOTS = [
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function toDateStr(date: Date): string {
  return date.toISOString().split('T')[0];
}

function formatDayHeader(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatWeekRange(weekStart: Date): string {
  const weekEnd = addDays(weekStart, 5);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return `${weekStart.toLocaleDateString('en-US', opts)} – ${weekEnd.toLocaleDateString('en-US', opts)}, ${weekEnd.getFullYear()}`;
}

export default function CalendarPage() {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const weekDays = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => addDays(weekStart, i));
  }, [weekStart]);

  useEffect(() => {
    setLoading(true);
    const start = toDateStr(weekDays[0]);
    const end = toDateStr(weekDays[weekDays.length - 1]);
    getBookingsForDateRange(start, end)
      .then(setBookings)
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [weekDays]);

  const bookingMap = useMemo(() => {
    const map: Record<string, Booking> = {};
    for (const b of bookings) {
      if (b.preferred_time) {
        map[`${b.preferred_date}|${b.preferred_time}`] = b;
      }
    }
    return map;
  }, [bookings]);

  function goToday() {
    setWeekStart(startOfWeek(new Date()));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-white">Calendar</h1>
          <p className="mt-1 text-sm text-muted">{formatWeekRange(weekStart)}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeekStart(addDays(weekStart, -7))}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-muted hover:border-white/20 hover:text-white"
          >
            ← Prev
          </button>
          <button
            onClick={goToday}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-muted hover:border-white/20 hover:text-white"
          >
            Today
          </button>
          <button
            onClick={() => setWeekStart(addDays(weekStart, 7))}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-muted hover:border-white/20 hover:text-white"
          >
            Next →
          </button>
        </div>
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-muted">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-night/50">
                <th className="w-24 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Time
                </th>
                {weekDays.map((day) => {
                  const isToday = toDateStr(day) === toDateStr(new Date());
                  return (
                    <th
                      key={toDateStr(day)}
                      className={`px-2 py-3 text-center text-xs font-semibold uppercase tracking-wider ${
                        isToday ? 'text-gold' : 'text-muted'
                      }`}
                    >
                      {formatDayHeader(day)}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {TIME_SLOTS.map((slot) => (
                <tr key={slot} className="border-b border-white/5">
                  <td className="px-3 py-2 text-xs text-muted">{slot}</td>
                  {weekDays.map((day) => {
                    const key = `${toDateStr(day)}|${slot}`;
                    const booking = bookingMap[key];
                    const isToday = toDateStr(day) === toDateStr(new Date());

                    return (
                      <td
                        key={key}
                        className={`px-1 py-1 ${isToday ? 'bg-gold/5' : ''}`}
                      >
                        {booking ? (
                          <Link
                            href={`/admin/bookings/${booking.id}`}
                            className="block rounded-lg border border-white/10 bg-night p-2 transition-colors hover:border-gold/30"
                          >
                            <p className="truncate text-xs font-medium text-white">
                              {booking.customer_name}
                            </p>
                            <p className="mt-0.5 truncate text-[0.65rem] text-muted">
                              {booking.service_type}
                            </p>
                            <div className="mt-1">
                              <StatusBadge status={booking.status} />
                            </div>
                          </Link>
                        ) : (
                          <div className="h-[72px] rounded-lg border border-transparent" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
