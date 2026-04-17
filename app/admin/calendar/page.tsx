'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getBookingsForDateRange, type Booking } from '@/lib/queries';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { AddBookingModal } from '@/components/admin/AddBookingModal';
import { TIME_SLOTS } from '@/lib/constants';

type ViewMode = 'month' | 'week';

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfMonth(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfMonth(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function toDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return toDateStr(a) === toDateStr(b);
}

function formatMonthTitle(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function formatWeekRange(weekStart: Date): string {
  const weekEnd = addDays(weekStart, 5);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return `${weekStart.toLocaleDateString('en-US', opts)} – ${weekEnd.toLocaleDateString('en-US', opts)}, ${weekEnd.getFullYear()}`;
}

function formatDayHeader(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function CalendarPage() {
  const [view, setView] = useState<ViewMode>('month');
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [modalInitialDate, setModalInitialDate] = useState<string | undefined>(undefined);
  const [reloadKey, setReloadKey] = useState(0);

  // Compute visible range based on view
  const { rangeStart, rangeEnd } = useMemo(() => {
    if (view === 'month') {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      // Extend to Sunday–Saturday grid boundaries
      const gridStart = new Date(monthStart);
      gridStart.setDate(gridStart.getDate() - gridStart.getDay());
      const gridEnd = new Date(monthEnd);
      gridEnd.setDate(gridEnd.getDate() + (6 - gridEnd.getDay()));
      return { rangeStart: gridStart, rangeEnd: gridEnd };
    }
    const ws = startOfWeek(currentDate);
    return { rangeStart: ws, rangeEnd: addDays(ws, 5) };
  }, [view, currentDate]);

  useEffect(() => {
    setLoading(true);
    getBookingsForDateRange(toDateStr(rangeStart), toDateStr(rangeEnd))
      .then(setBookings)
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [rangeStart, rangeEnd, reloadKey]);

  const bookingsByDate = useMemo(() => {
    const map: Record<string, Booking[]> = {};
    for (const b of bookings) {
      if (!map[b.preferred_date]) map[b.preferred_date] = [];
      map[b.preferred_date].push(b);
    }
    return map;
  }, [bookings]);

  const handleCreated = useCallback(() => {
    setReloadKey((k) => k + 1);
  }, []);

  function navPrev() {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, -1));
    } else {
      setCurrentDate(addDays(currentDate, -7));
    }
  }

  function navNext() {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      setCurrentDate(addDays(currentDate, 7));
    }
  }

  function navToday() {
    setCurrentDate(new Date());
  }

  function openAddModal(date?: string) {
    setModalInitialDate(date);
    setShowAdd(true);
  }

  const title = view === 'month' ? formatMonthTitle(currentDate) : formatWeekRange(startOfWeek(currentDate));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-white">Calendar</h1>
          <p className="mt-1 text-sm text-muted">{title}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex overflow-hidden rounded-lg border border-white/10">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                view === 'month' ? 'bg-gold text-night' : 'text-muted hover:text-white'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                view === 'week' ? 'bg-gold text-night' : 'text-muted hover:text-white'
              }`}
            >
              Week
            </button>
          </div>

          <button
            onClick={navPrev}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-muted hover:border-white/20 hover:text-white"
          >
            ← Prev
          </button>
          <button
            onClick={navToday}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-muted hover:border-white/20 hover:text-white"
          >
            Today
          </button>
          <button
            onClick={navNext}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-muted hover:border-white/20 hover:text-white"
          >
            Next →
          </button>

          <button
            onClick={() => openAddModal()}
            className="rounded-full bg-gradient-to-r from-gold to-gold-dark px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-night"
          >
            + Add booking
          </button>
        </div>
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-muted">Loading…</p>
      ) : view === 'month' ? (
        <MonthGrid
          currentDate={currentDate}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          bookingsByDate={bookingsByDate}
          onAddClick={openAddModal}
        />
      ) : (
        <WeekGrid
          weekStart={startOfWeek(currentDate)}
          bookingsByDate={bookingsByDate}
          onAddClick={openAddModal}
        />
      )}

      <AddBookingModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onCreated={handleCreated}
        initialDate={modalInitialDate}
      />
    </div>
  );
}

function MonthGrid({
  currentDate,
  rangeStart,
  rangeEnd,
  bookingsByDate,
  onAddClick,
}: {
  currentDate: Date;
  rangeStart: Date;
  rangeEnd: Date;
  bookingsByDate: Record<string, Booking[]>;
  onAddClick: (date: string) => void;
}) {
  const days: Date[] = [];
  const cursor = new Date(rangeStart);
  while (cursor <= rangeEnd) {
    days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  const today = new Date();
  const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="grid grid-cols-7 border-b border-white/10 bg-night/50">
        {weekdayLabels.map((l) => (
          <div key={l} className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-muted">
            {l}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((day) => {
          const dateStr = toDateStr(day);
          const dayBookings = bookingsByDate[dateStr] ?? [];
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday = isSameDay(day, today);

          return (
            <div
              key={dateStr}
              className={`group relative min-h-[120px] border-b border-r border-white/5 p-2 ${
                isCurrentMonth ? 'bg-night/30' : 'bg-black/40'
              } ${isToday ? 'bg-gold/5' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-medium ${
                    isToday ? 'text-gold' : isCurrentMonth ? 'text-white/80' : 'text-white/25'
                  }`}
                >
                  {day.getDate()}
                </span>
                <button
                  onClick={() => onAddClick(dateStr)}
                  className="rounded-full border border-white/10 px-1.5 py-0 text-[0.65rem] text-muted opacity-0 transition-opacity group-hover:opacity-100 hover:border-gold/50 hover:text-gold"
                  title="Add booking"
                >
                  +
                </button>
              </div>

              <div className="mt-1 space-y-1">
                {dayBookings.slice(0, 3).map((b) => (
                  <Link
                    key={b.id}
                    href={`/admin/bookings/${b.id}`}
                    className="block truncate rounded bg-white/5 px-1.5 py-0.5 text-[0.65rem] text-white/90 hover:bg-gold/20 hover:text-white"
                  >
                    {b.preferred_time ? <span className="text-gold">{b.preferred_time.replace(':00 ', '')}</span> : null}{' '}
                    {b.customer_name}
                  </Link>
                ))}
                {dayBookings.length > 3 && (
                  <p className="px-1.5 text-[0.65rem] text-muted">+{dayBookings.length - 3} more</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekGrid({
  weekStart,
  bookingsByDate,
  onAddClick,
}: {
  weekStart: Date;
  bookingsByDate: Record<string, Booking[]>;
  onAddClick: (date: string) => void;
}) {
  const weekDays = Array.from({ length: 6 }, (_, i) => addDays(weekStart, i));
  const today = new Date();

  const slotMap: Record<string, Booking> = {};
  for (const list of Object.values(bookingsByDate)) {
    for (const b of list) {
      if (b.preferred_time) slotMap[`${b.preferred_date}|${b.preferred_time}`] = b;
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-night/50">
            <th className="w-24 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted">
              Time
            </th>
            {weekDays.map((day) => {
              const isToday = isSameDay(day, today);
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
                const dateStr = toDateStr(day);
                const key = `${dateStr}|${slot}`;
                const booking = slotMap[key];
                const isToday = isSameDay(day, today);

                return (
                  <td key={key} className={`px-1 py-1 ${isToday ? 'bg-gold/5' : ''}`}>
                    {booking ? (
                      <Link
                        href={`/admin/bookings/${booking.id}`}
                        className="block rounded-lg border border-white/10 bg-night p-2 transition-colors hover:border-gold/30"
                      >
                        <p className="truncate text-xs font-medium text-white">{booking.customer_name}</p>
                        <p className="mt-0.5 truncate text-[0.65rem] text-muted">{booking.service_type}</p>
                        <div className="mt-1">
                          <StatusBadge status={booking.status} />
                        </div>
                      </Link>
                    ) : (
                      <button
                        onClick={() => onAddClick(dateStr)}
                        className="block h-[72px] w-full rounded-lg border border-transparent text-[0.65rem] text-transparent transition-colors hover:border-gold/30 hover:bg-white/5 hover:text-muted"
                      >
                        + Add
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
