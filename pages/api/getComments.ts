import { supabase } from '@/lib/supabase/server'

export default async function handler(req, res) {
  const { post_id } = JSON.parse(req.body)

  const { data, error } = await supabase
    .from('comments')
    .select('post_id, nickname, payload, created_at, id, published, email')
    .eq('post_id', post_id)
    .order('created_at', { ascending: true })

  if (error) res.status(500).json(error)
  res.status(200).json(data)
}
