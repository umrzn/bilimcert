import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Авторизация қажет' 
        },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id } = params

    // Forward the request to Django backend
    const response = await fetch(`${BACKEND_URL}/api/admin/submissions/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json(data)
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Статусты жаңарту кезінде қате орын алды' 
        },
        { status: response.status }
      )
    }
  } catch (error) {
    console.error('Update status API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Сервер қатесі' 
      },
      { status: 500 }
    )
  }
}
