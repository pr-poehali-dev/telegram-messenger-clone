import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Алекс', text: 'Привет! Как дела?', time: '14:20', avatar: '👨‍💻', online: true },
    { id: 2, sender: 'Мария', text: 'Сегодня отличная погода!', time: '13:45', avatar: '👩‍🎨', online: true },
    { id: 3, sender: 'Бот SecretBot', text: 'Введите код для получения прав админа', time: '12:30', avatar: '🤖', online: false, isBot: true },
  ]);
  
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

  const handleSecretCodeClick = (code) => {
    if (!collectedCodes.includes(code)) {
      setCollectedCodes([...collectedCodes, code]);
      if (collectedCodes.length + 1 === secretCodes.length) {
        const finalCode = 'ADMIN_' + secretCodes.join('_');
        setMessages([...messages, { 
          id: Date.now(), 
          sender: 'Система', 
          text: `Секретный код собран: ${finalCode}. Отправь его боту!`, 
          time: new Date().toLocaleTimeString().slice(0, 5), 
          avatar: '🔐', 
          isSystem: true 
        }]);
      }
    }
  };

  const renderChats = () => (
    <div className="space-y-3">
      {messages.map((msg) => (
        <Card key={msg.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="text-lg">{msg.avatar}</AvatarFallback>
              </Avatar>
              {msg.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-telegram-green rounded-full border-2 border-white"></div>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 truncate">{msg.sender}</h3>
                <span className="text-sm text-gray-500">{msg.time}</span>
              </div>
              <p className="text-gray-600 truncate">{msg.text}</p>
              {msg.isBot && <Badge variant="secondary" className="mt-1">Бот</Badge>}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderStatuses = () => (
    <div className="space-y-3">
      <Card className="p-4 bg-telegram-blue text-white">
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
            <Button variant="outline" size="sm">
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

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'chats' && renderChats()}
          {activeTab === 'statuses' && renderStatuses()}
          {activeTab === 'contacts' && renderContacts()}
          {activeTab === 'groups' && renderGroups()}
          {activeTab === 'profile' && renderProfile()}
        </div>
      </div>

      {/* Bottom Action */}
      {activeTab === 'chats' && (
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