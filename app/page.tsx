'use client'
import Image from 'next/image'
import userPic from '../public/images/user.jpg'
import masterPic from '../public/images/zen-haiku.png'
import cloud1 from '../public/images/cloud1.png'
import cloud2 from '../public/images/cloud2.png'
import yinYang from '../public/images/yinyang.svg'
import useState from 'react-usestateref'
import './globals.css'
import {Send} from 'react-bootstrap-icons'

enum Creator {
    Me = 0,
    Bot = 1,
}

interface MessageProps {
    text: string
    from: Creator
    key: number
}

interface InputProps {
    onSend: (input: string) => void
    disabled: boolean
}

const ChatMessage = ({text, from}: MessageProps) => {
    return (
        <div className={'chat'}>
            {from === Creator.Me && (
                <div className={'userChat'}>
                    <Image className={'userPic'} src={userPic} alt={'User'} width={40}/>
                    <p className={'text-grey-700'}>{text}</p>
                </div>
            )}
            {from === Creator.Bot && (
                <div className={'userChat'}>
                    <Image src={masterPic} alt={'Master'} width={40}/>
                    <div className={'botChat'}>
                        {text.split('\n').map((line, index) => (
                            <span key={index}>
                    {line}
                                <br/>
                        </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

const ChatInput = ({onSend, disabled}: InputProps) => {
    const [input, setInput] = useState('')

    const sendInput = () => {
        onSend(input)
        setInput('')
    }

    const handleKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            sendInput()
        }
    }

    return (
        <div className={'inputContainer'}>
            <input
                type="text"
                value={input}
                onChange={(e: any) => setInput(e.target.value)}
                className={disabled ? 'chatInputNoBorder' : 'chatInput'}
                placeholder={disabled ? '...' : 'Dimmi…'}
                disabled={disabled}
                onKeyDown={(e) => handleKeyDown(e)}
                autoFocus={true}
            />
            {disabled && (
                <Image src={yinYang} alt={'Loader'} className={'loader'} width={24} height={24}/>
            )}
            {!disabled && (
                <button
                    onClick={() => sendInput()}
                    className={'chatButton'}
                >
                    <Send width={24} height={24}/>
                </button>
            )}
        </div>
    )
}

const reloadPage = () => {
    window.location.reload()
}

export default function Home() {
    const [messages, setMessages, messagesRef] = useState<MessageProps[]>([])
    const [loading, setLoading] = useState(false)

    const callApi = async (input: string) => {
        setLoading(true)

        const myMessage: MessageProps = {
            text: input,
            from: Creator.Me,
            key: new Date().getTime()
        }

        setMessages([...messagesRef.current, myMessage])
        const response = await fetch('/api/generate-answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input
            })
        }).then((response) => response.json())
        setLoading(false)

        if (response.text) {
            const botMessage: MessageProps = {
                text: response.text,
                from: Creator.Bot,
                key: new Date().getTime()
            }
            setMessages([...messagesRef.current, botMessage])
        } else {
            console.log('Error')
        }
    }

    console.log(messages)
    return (
        <main className={'app'}>
            <div className={'masterContainer'}>
              <Image className={'cloud1'} src={cloud1} alt={'Il tuo senior dev'} width={50}
                     onClick={reloadPage}/>
                <Image className={'masterPic'} src={masterPic} alt={'Il tuo senior dev'} width={120}
                       onClick={reloadPage}/>
              <Image className={'cloud2'} src={cloud2} alt={'Il tuo senior dev'} width={50}
                     onClick={reloadPage}/>
            </div>
            <p>Sono Senior Dev Haiku… No, non mi disturbi</p>
            <div className={''}>
                <ChatInput onSend={(input) => callApi(input)} disabled={loading}/>
            </div>
            <div className={'messages'}>
                {messages.map((msg: MessageProps) => (
                    <ChatMessage key={msg.key} text={msg.text} from={msg.from}/>
                ))}
                {messages.length === 0 && <p className={'text-center text-gray-400'}>I messaggi appariranno qui…</p>}
            </div>
        </main>
    )
}
