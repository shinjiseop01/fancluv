import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth functions
export const signUp = async (email: string, password: string, nickname: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error

  // Create user profile
  if (data.user) {
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: data.user.id,
          email,
          nickname,
        },
      ])

    if (profileError) throw profileError
  }

  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  return data.user
}

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}

// User functions
export const updateUserClub = async (userId: string, clubId: string) => {
  const { data, error } = await supabase
    .from('users')
    .update({ favorite_club_id: clubId })
    .eq('id', userId)

  if (error) throw error
  return data
}

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

// Club functions
export const getClubs = async () => {
  const { data, error } = await supabase
    .from('clubs')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

export const getClubById = async (clubId: string) => {
  const { data, error } = await supabase
    .from('clubs')
    .select('*')
    .eq('id', clubId)
    .single()

  if (error) throw error
  return data
}

// Opinion functions
export const getOpinions = async (clubId: string) => {
  const { data, error } = await supabase
    .from('opinions')
    .select('*, user:users(nickname), comments_count, likes_count')
    .eq('club_id', clubId)
    .eq('is_hidden', false)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getOpinionById = async (opinionId: string) => {
  const { data, error } = await supabase
    .from('opinions')
    .select('*, user:users(nickname), comments_count, likes_count')
    .eq('id', opinionId)
    .single()

  if (error) throw error
  return data
}

export const createOpinion = async (
  userId: string,
  clubId: string,
  category: string,
  title: string,
  content: string
) => {
  const { data, error } = await supabase
    .from('opinions')
    .insert([
      {
        user_id: userId,
        club_id: clubId,
        category,
        title,
        content,
      },
    ])
    .select()

  if (error) throw error
  return data[0]
}

export const hideOpinion = async (opinionId: string) => {
  const { data, error } = await supabase
    .from('opinions')
    .update({ is_hidden: true })
    .eq('id', opinionId)

  if (error) throw error
  return data
}

// Comment functions
export const getComments = async (opinionId: string) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*, user:users(nickname)')
    .eq('opinion_id', opinionId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const createComment = async (opinionId: string, userId: string, content: string) => {
  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        opinion_id: opinionId,
        user_id: userId,
        content,
      },
    ])
    .select()

  if (error) throw error

  // Update comments_count
  await supabase.rpc('increment_comments_count', { opinion_id: opinionId })

  return data[0]
}

// Like functions
export const getLikes = async (opinionId: string) => {
  const { data, error } = await supabase
    .from('likes')
    .select('count', { count: 'exact' })
    .eq('opinion_id', opinionId)

  if (error) throw error
  return data
}

export const toggleLike = async (opinionId: string, userId: string) => {
  // Check if like exists
  const { data: existingLike, error: checkError } = await supabase
    .from('likes')
    .select('id')
    .eq('opinion_id', opinionId)
    .eq('user_id', userId)
    .single()

  if (checkError && checkError.code !== 'PGRST116') {
    throw checkError
  }

  if (existingLike) {
    // Unlike
    const { error: deleteError } = await supabase
      .from('likes')
      .delete()
      .eq('id', existingLike.id)

    if (deleteError) throw deleteError

    // Decrement likes_count
    await supabase.rpc('decrement_likes_count', { opinion_id: opinionId })
  } else {
    // Like
    const { error: insertError } = await supabase
      .from('likes')
      .insert([
        {
          opinion_id: opinionId,
          user_id: userId,
        },
      ])

    if (insertError) throw insertError

    // Increment likes_count
    await supabase.rpc('increment_likes_count', { opinion_id: opinionId })
  }
}

// Survey functions
export const getSurveys = async (clubId: string) => {
  const { data, error } = await supabase
    .from('surveys')
    .select('*')
    .eq('club_id', clubId)
    .eq('is_active', true)

  if (error) throw error
  return data
}

export const getSurveyById = async (surveyId: string) => {
  const { data, error } = await supabase
    .from('surveys')
    .select('*')
    .eq('id', surveyId)
    .single()

  if (error) throw error
  return data
}

export const submitSurveyResponse = async (
  surveyId: string,
  userId: string,
  selectedOption: string
) => {
  const { data, error } = await supabase
    .from('survey_responses')
    .insert([
      {
        survey_id: surveyId,
        user_id: userId,
        selected_option: selectedOption,
      },
    ])
    .select()

  if (error) throw error

  // Increment responses_count
  await supabase.rpc('increment_survey_responses', { survey_id: surveyId })

  return data[0]
}

export const getSurveyResponses = async (surveyId: string) => {
  const { data, error } = await supabase
    .from('survey_responses')
    .select('selected_option, count')
    .eq('survey_id', surveyId)

  if (error) throw error
  return data
}
