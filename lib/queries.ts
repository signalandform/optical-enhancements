import { supabase } from './supabase';

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  service_type: string;
  preferred_date: string;
  preferred_time: string | null;
  details: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

export async function getContacts(statusFilter?: ContactSubmission['status']) {
  let query = supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (statusFilter) {
    query = query.eq('status', statusFilter);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as ContactSubmission[];
}

export async function getContact(id: string) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as ContactSubmission;
}

export async function updateContact(
  id: string,
  updates: { status?: string; admin_notes?: string }
) {
  const { error } = await supabase
    .from('contact_submissions')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
}

export async function getBookings(statusFilter?: Booking['status']) {
  let query = supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (statusFilter) {
    query = query.eq('status', statusFilter);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Booking[];
}

export async function getBooking(id: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Booking;
}

export async function updateBooking(
  id: string,
  updates: { status?: string; admin_notes?: string }
) {
  const { error } = await supabase
    .from('bookings')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
}

export async function getNewContactsCount() {
  const { count, error } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new');

  if (error) throw error;
  return count ?? 0;
}

export async function getPendingBookingsCount() {
  const { count, error } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  if (error) throw error;
  return count ?? 0;
}

export async function getBookedSlotsForDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('preferred_time')
    .eq('preferred_date', date)
    .in('status', ['pending', 'confirmed']);

  if (error) throw error;
  return (data ?? []).map((r) => r.preferred_time).filter(Boolean) as string[];
}

export async function getBookingsForDateRange(startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .gte('preferred_date', startDate)
    .lte('preferred_date', endDate)
    .order('preferred_date', { ascending: true })
    .order('preferred_time', { ascending: true });

  if (error) throw error;
  return data as Booking[];
}
