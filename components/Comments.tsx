'use client'

import { useEffect, useState } from 'react'

const Comments = ({ id }) => {
  const [comment, setComment] = useState('')
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState([])
  const [completed, setCompleted] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/postComment', {
        method: 'POST',
        body: JSON.stringify({
          post_id: id,
          nickname,
          email,
          comment,
        }),
      })
      setLoading(false)
      setComment('')
      setEmail('')
      setNickname('')
      alert('Comment sent')
      getComments()
    } catch (error) {
      console.error('Error posting data:', error)
      setLoading(false)
    }
  }

  const getComments = async () => {
    try {
      const response = await fetch('/api/getComments', {
        method: 'POST',
        body: JSON.stringify({
          post_id: id,
        }),
      })
      const responseData = await response.json()
      setComments(responseData)
    } catch (error) {
      console.error('Error posting data:', error)
    }
  }

  useEffect(() => {
    getComments()
  }, [id])

  useEffect(() => {
    if (comment && email && nickname) setCompleted(true)
  }, [comment, email, nickname])

  return (
    <>
      {comments.length > 0 && (
        <>
          {comments.map((comment, index) => (
            <div className='my-4 border p-6' key={index}>
              <header className='text-sm'>
                {`Posted by ${comment.nickname} on ${new Date(
                  comment.created_at
                ).toLocaleDateString('zh-TW', {})}`}
              </header>
              <p className='mt-4'>{comment.payload}</p>
            </div>
          ))}
        </>
      )}

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='comment' className='mb-2 mt-6 block text-lg'>
            Comment
          </label>
          <textarea
            id='comment'
            onChange={(e) => setComment(e.target.value)}
            placeholder='Your comment'
            className='w-full border p-4'
            value={comment}
          />
        </div>
        <div>
          <label htmlFor='email' className='mb-2 mt-6 block text-lg'>
            Email
          </label>
          <input
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Your email'
            className='w-full border p-4'
            value={email}
          />
        </div>
        <div>
          <label htmlFor='nickname' className='mb-2 mt-6 block text-lg'>
            Nickname
          </label>
          <input
            id='nickname'
            onChange={(e) => setNickname(e.target.value)}
            type='text'
            placeholder='Your nickname'
            className='w-full border p-4'
            value={nickname}
          />
        </div>
        <button
          className='mt-6 bg-slate-700 p-4 text-white disabled:cursor-not-allowed disabled:opacity-50'
          type='submit'
          disabled={loading || !completed}
        >
          {loading ? 'Loading...' : 'Send comment'}
        </button>
      </form>
    </>
  )
}

export default Comments
