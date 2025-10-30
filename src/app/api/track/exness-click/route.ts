import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyToken } from '@/lib/auth'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    // Verify user authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { partner_id, click_url, user_email, click_source } = await request.json()

    // Get IP and User Agent
    const ip_address = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      'unknown'
    const user_agent = request.headers.get('user-agent') || 'unknown'

    // Generate unique click_id for tracking
    const click_id = `click_${Date.now()}_${Math.random().toString(36).substring(7)}`

    // Record click in database
    const { data, error } = await supabaseAdmin
      .from('exness_clicks')
      .insert({
        user_id: decoded.userId,
        user_email: user_email, // ✅ Store email for matching
        click_url,
        partner_id,
        ip_address,
        user_agent,
        click_id, // ✅ Unique identifier for this click
        click_source: click_source || 'unknown' // ✅ Track where click came from
      })
      .select()
      .single()

    if (error) {
      console.error('Error recording click:', error)
      return NextResponse.json({ error: 'Failed to record click' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      click_id: data.id,
      message: 'Click tracked successfully'
    })

  } catch (error) {
    console.error('Track click error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
