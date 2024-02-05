import { supabase } from '@/lib/supabase/server'

export default async function handler(req, res) {
  const { post_id, email, comment, nickname } = JSON.parse(req.body)

  const { data, error } = await supabase.from('comments').insert({
    post_id,
    email,
    nickname,
    payload: comment,
  })

  if (error) return res.status(500).json(error)

  await fetch('https://hooks.slack.com/services/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', {
    method: 'POST',
    body: JSON.stringify({
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'New comment waiting for approval!',
            emoji: true,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Blog post:*\nhttp://localhost:3000/blog/${post_id}`,
            },
            {
              type: 'mrkdwn',
              text: `*post_id:*\n<https://supabase.com/dashboard/project/kmimxhcpximbajtshrve/editor/28564|${post_id}>`,
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Comment:*\n${comment}`,
          },
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `*Submitted by:* ${nickname} (<mailto:${email}|${email}>)`,
            },
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                emoji: true,
                text: 'Approve',
              },
              style: 'primary',
              action_id: 'approve_comment',
              value: post_id,
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                emoji: true,
                text: 'Delete',
              },
              style: 'danger',
              action_id: 'delete_comment',
              value: post_id,
              confirm: {
                title: {
                  type: 'plain_text',
                  text: 'Are you sure?',
                },
                text: {
                  type: 'mrkdwn',
                  text: 'This will delete the comment permanently.',
                },
                confirm: {
                  type: 'plain_text',
                  text: 'Delete',
                },
                deny: {
                  type: 'plain_text',
                  text: 'Cancel',
                },
                style: 'danger',
              },
            },
          ],
        },
      ],
    }),
  })

  res.status(200).json(data)
}
