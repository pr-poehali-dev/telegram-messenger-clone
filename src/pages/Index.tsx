import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState({});
  const messagesEndRef = useRef(null);
  
  const [chatData, setChatData] = useState({
    1: {
      id: 1,
      name: 'Алекс',
      avatar: '👨‍💻',
      online: true,
      lastSeen: 'в сети',
      messages: [
        { id: 1, text: 'Привет! Как дела?', time: '14:20', sender: 'friend', delivered: true },
        { id: 2, text: 'Отлично! А у тебя как?', time: '14:21', sender: 'me', delivered: true },
        { id: 3, text: 'Тоже хорошо! Планы на вечер есть?', time: '14:22', sender: 'friend', delivered: true },
      ]
    },
    2: {
      id: 2,
      name: 'Мария',
      avatar: '👩‍🎨',
      online: true,
      lastSeen: 'в сети',
      messages: [
        { id: 1, text: 'Сегодня отличная погода!', time: '13:45', sender: 'friend', delivered: true },
        { id: 2, text: 'Да, солнышко радует ☀️', time: '13:46', sender: 'me', delivered: true },
      ]
    },
    3: {
      id: 3,
      name: 'Бот SecretBot',
      avatar: '🤖',
      online: false,
      lastSeen: 'был в сети час назад',
      isBot: true,
      messages: [
        { id: 1, text: 'Введите код для получения прав админа', time: '12:30', sender: 'friend', delivered: true },
      ]
    }
  });
  
  const [statuses, setStatuses] = useState([
    { id: 1, user: 'Анна', status: 'На работе 💼', time: '2ч назад', avatar: '👩‍💼' },
    { id: 2, user: 'Дмитрий', status: 'Читаю книгу 📚', time: '1ч назад', avatar: '👨‍🎓' },
    { id: 3, user: 'Елена', status: 'В отпуске 🏖️', time: '30мин назад', avatar: '👩‍🌾' },
  ]);

  const [contacts] = useState([
    { id: 1, name: 'Алекс Иванов', phone: '+7 999 123-45-67', avatar: '👨‍💻', online: true },
    { id: 2, name: 'Мария Петрова', phone: '+7 999 765-43-21', avatar: '👩‍🎨', online: true },
    { id: 3, name: 'Анна Сидорова', phone: '+7 999 555-12-34', avatar: '👩‍💼', online: false },
  ]);

  const [groups] = useState([
    { id: 1, name: 'Команда разработки', members: 12, avatar: '💻', lastMessage: 'Встреча в 15:00' },
    { id: 2, name: 'Друзья', members: 8, avatar: '🎉', lastMessage: 'Планы на выходные?' },
    { id: 3, name: 'Семья', members: 5, avatar: '👨‍👩‍👧‍👦', lastMessage: 'Ужин в воскресенье' },
  ]);

  const [secretCodes] = useState(['SPACE', 'ROCKET', 'MISSION']);
  const [collectedCodes, setCollectedCodes] = useState([]);
  const [adminMode, setAdminMode] = useState(false);

  // Автопрокрутка к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, chatData]);

  // Автоответы друзей
  const friendResponses = {
    1: [ // Алекс
      'Интересно! Расскажи подробнее 🤔',
      'Согласен с тобой полностью!',
      'А что думаешь насчет завтрашней встречи?',
      'Кстати, видел новости? Запустили новую ракету! 🚀',
      'Хорошая идея! Давай так и сделаем',
    ],
    2: [ // Мария
      'Звучит здорово! 🎨',
      'О, это мне напоминает мою последнюю картину',
      'Точно! А еще можно добавить немного креатива',
      'Вчера была на выставке, очень вдохновляет!',
      'Да, творчество - это сила! ✨',
    ],
    3: [ // Бот
      'Обрабатываю ваш запрос... 🤖',
      'Команда не распознана. Введите /help для справки',
      'Доступ ограничен. Требуются права администратора',
      'Секретный код принят. Активирую функции...⚡',
      'Система обновлена. Добро пожаловать, админ!',
    ]
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const currentTime = new Date().toLocaleTimeString().slice(0, 5);
    const messageId = Date.now();

    // Добавляем сообщение пользователя
    setChatData(prev => ({
      ...prev,
      [selectedChat]: {
        ...prev[selectedChat],
        messages: [
          ...prev[selectedChat].messages,
          {
            id: messageId,
            text: newMessage,
            time: currentTime,
            sender: 'me',
            delivered: false
          }
        ]
      }
    }));

    const messageText = newMessage;
    setNewMessage('');

    // Имитация доставки через 500ms
    setTimeout(() => {
      setChatData(prev => ({
        ...prev,
        [selectedChat]: {
          ...prev[selectedChat],
          messages: prev[selectedChat].messages.map(msg => 
            msg.id === messageId ? { ...msg, delivered: true } : msg
          )
        }
      }));
    }, 500);

    // Показываем "печатает"
    setIsTyping(prev => ({ ...prev, [selectedChat]: true }));

    // Автоответ через 1-3 секунды
    const responseDelay = Math.random() * 2000 + 1000;
    setTimeout(() => {
      setIsTyping(prev => ({ ...prev, [selectedChat]: false }));
      
      const responses = friendResponses[selectedChat] || ['Понятно!', 'Хорошо!', 'Согласен!'];
      let response;

      // Особая логика для бота
      if (selectedChat === 3) {
        if (messageText.includes('ADMIN_SPACE_ROCKET_MISSION')) {
          response = 'Секретный код принят! 🔓 Вам предоставлены права администратора. Добро пожаловать!';
          setAdminMode(true);
        } else if (messageText.startsWith('/')) {
          response = 'Доступные команды: /help, /status, /admin. Для админ-функций введите секретный код.';
        } else {
          response = responses[Math.floor(Math.random() * responses.length)];
        }
      } else {
        response = responses[Math.floor(Math.random() * responses.length)];
      }

      setChatData(prev => ({
        ...prev,
        [selectedChat]: {
          ...prev[selectedChat],
          messages: [
            ...prev[selectedChat].messages,
            {
              id: Date.now() + 1,
              text: response,
              time: new Date().toLocaleTimeString().slice(0, 5),
              sender: 'friend',
              delivered: true
            }
          ]
        }
      }));
    }, responseDelay);
  };

  const handleSecretCodeClick = (code) => {
    if (!collectedCodes.includes(code)) {
      setCollectedCodes([...collectedCodes, code]);
      if (collectedCodes.length + 1 === secretCodes.length) {
        const finalCode = 'ADMIN_' + secretCodes.join('_');
        // Показать код в системном сообщении
        setChatData(prev => ({
          ...prev,
          3: {
            ...prev[3],
            messages: [
              ...prev[3].messages,
              {
                id: Date.now(),
                text: `🔐 Секретный код собран: ${finalCode}\nОтправь его боту для получения админ-прав!`,
                time: new Date().toLocaleTimeString().slice(0, 5),
                sender: 'system',
                delivered: true
              }
            ]
          }
        }));
      }
    }
  };

  const openChat = (chatId) => {
    setSelectedChat(chatId);
    setActiveTab('chat');
  };

  const renderChatList = () => (
    <div className="space-y-3">
      {Object.values(chatData).map((chat) => (
        <Card key={chat.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => openChat(chat.id)}>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="text-lg">{chat.avatar}</AvatarFallback>
              </Avatar>
              {chat.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-telegram-green rounded-full border-2 border-white"></div>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                <span className="text-sm text-gray-500">{chat.messages[chat.messages.length - 1]?.time}</span>
              </div>
              <p className="text-gray-600 truncate">{chat.messages[chat.messages.length - 1]?.text}</p>
              {chat.isBot && <Badge variant="secondary" className="mt-1">Бот</Badge>}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderChat = () => {
    const chat = chatData[selectedChat];
    if (!chat) return null;

    return (
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        {/* Chat Header */}
        <Card className="p-4 mb-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => setActiveTab('chats')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="text-lg">{chat.avatar}</AvatarFallback>
              </Avatar>
              {chat.online && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-telegram-green rounded-full border-2 border-white"></div>}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{chat.name}</h3>
              <p className="text-sm text-gray-500">{isTyping[selectedChat] ? 'печатает...' : chat.lastSeen}</p>
            </div>
            <Button variant="ghost" size="sm">
              <Icon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Video" size={20} />
            </Button>
          </div>
        </Card>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 px-1">
          {chat.messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'me' 
                  ? 'bg-telegram-blue text-white' 
                  : message.sender === 'system'
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <div className={`flex items-center justify-end space-x-1 mt-1 ${
                  message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  <span className="text-xs">{message.time}</span>
                  {message.sender === 'me' && (
                    <Icon 
                      name={message.delivered ? "CheckCheck" : "Check"} 
                      size={12} 
                      className={message.delivered ? 'text-blue-200' : 'text-blue-300'}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping[selectedChat] && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <Card className="p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Button type="button" variant="ghost" size="sm">
              <Icon name="Paperclip" size={20} />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Написать сообщение..."
              className="flex-1"
            />
            <Button type="submit" disabled={!newMessage.trim()}>
              <Icon name="Send" size={20} />
            </Button>
          </form>
        </Card>
      </div>
    );
  };

  const renderStatuses = () => (
    <div className="space-y-3">
      <Card className="p-4 bg-telegram-blue text-white cursor-pointer">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-white text-telegram-blue">🚀</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Добавить статус</h3>
            <p className="text-blue-100">Поделитесь своим настроением</p>
          </div>
        </div>
      </Card>
      {statuses.map((status) => (
        <Card key={status.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="text-lg">{status.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{status.user}</h3>
              <p className="text-gray-600">{status.status}</p>
              <span className="text-sm text-gray-400">{status.time}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-3">
      {contacts.map((contact) => (
        <Card key={contact.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="text-lg">{contact.avatar}</AvatarFallback>
              </Avatar>
              {contact.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-telegram-green rounded-full border-2 border-white"></div>}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{contact.name}</h3>
              <p className="text-gray-600">{contact.phone}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => openChat(contact.id)}>
              <Icon name="MessageCircle" size={16} />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderGroups = () => (
    <div className="space-y-3">
      {groups.map((group) => (
        <Card key={group.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="text-lg bg-telegram-blue text-white">{group.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{group.name}</h3>
                <Badge variant="outline">{group.members}</Badge>
              </div>
              <p className="text-gray-600">{group.lastMessage}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderProfile = () => (
    <Card className="p-6">
      <div className="text-center space-y-4">
        <Avatar className="w-24 h-24 mx-auto">
          <AvatarFallback className="text-3xl bg-telegram-blue text-white">👨‍🚀</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Юрий Космонавт</h2>
          <p className="text-gray-600">@space_explorer</p>
        </div>
        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            <Icon name="Settings" size={16} className="mr-2" />
            Настройки
          </Button>
          <Button variant="outline" className="w-full">
            <Icon name="Moon" size={16} className="mr-2" />
            Темная тема
          </Button>
          {adminMode && (
            <Button variant="destructive" className="w-full">
              <Icon name="Shield" size={16} className="mr-2" />
              Режим администратора
            </Button>
          )}
        </div>
        
        {/* Секретные коды */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">🔍 Найди секретные коды:</h3>
          <div className="grid grid-cols-3 gap-2">
            {secretCodes.map((code, index) => (
              <Button
                key={code}
                variant={collectedCodes.includes(code) ? "default" : "outline"}
                size="sm"
                onClick={() => handleSecretCodeClick(code)}
                className="text-xs"
              >
                {collectedCodes.includes(code) ? '✓' : '?'} {index + 1}
              </Button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Собрано: {collectedCodes.length}/{secretCodes.length}
          </p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-telegram-lightGray">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">SpaceChat</h1>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="MoreVertical" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        {activeTab !== 'chat' && (
          <div className="mb-6">
            <nav className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
              {[
                { id: 'chats', label: 'Чаты', icon: 'MessageCircle' },
                { id: 'statuses', label: 'Статусы', icon: 'Circle' },
                { id: 'contacts', label: 'Контакты', icon: 'Users' },
                { id: 'groups', label: 'Группы', icon: 'Users2' },
                { id: 'profile', label: 'Профиль', icon: 'User' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-telegram-blue text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon name={tab.icon} size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'chats' && renderChatList()}
          {activeTab === 'chat' && renderChat()}
          {activeTab === 'statuses' && renderStatuses()}
          {activeTab === 'contacts' && renderContacts()}
          {activeTab === 'groups' && renderGroups()}
          {activeTab === 'profile' && renderProfile()}
        </div>
      </div>

      {/* Floating Action Button */}
      {(activeTab === 'chats' || activeTab === 'contacts') && (
        <div className="fixed bottom-6 right-6">
          <Button className="w-14 h-14 rounded-full bg-telegram-blue hover:bg-blue-600 shadow-lg">
            <Icon name="Plus" size={24} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;