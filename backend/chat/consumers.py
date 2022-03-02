from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from django.contrib.auth.models import User
from .models import MessageForChat


class ChatConsumer(WebsocketConsumer):

    def init_chat(self, data):
        username = data['username']
        user = User.objects.get_or_create(username=username)
        content = {
            'command': 'init_chat'
        }
        if not user:
            content['error'] = 'Unable to get or create User with username: ' + username
            self.send_message(content)
        content['success'] = 'Chatting in with success with username: ' + username
        print('init_chat', content)
        self.send_message(content)

    def fetch_messages(self, data):
        print('fetch_messages')
        messages = MessageForChat.objects.all()
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    def new_message(self, data):
        print('new_message', data)
        author = data['message']['from']
        text = data['message']['text']
        message = MessageForChat.objects.create(
            author=author, text=text)
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        self.send_chat_message(content)

    def messages_to_json(self, messages):
        print('messages_to_json')
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        print('message_to_json', message)
        return {
            'author': message.author,
            'text': message.text
        }

    commands = {
        'init_chat': init_chat,
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    def connect(self):
        print('connect')
        self.room_name = 'room'
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        print('disconnect')
        # leave group room
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        print('receive', data)
        self.commands[data['command']](self, data)

    def send_message(self, message):
        print('send_message', json.dumps(message))
        self.send(text_data=json.dumps(message))

    def send_chat_message(self, message):
        print('send_chat_message', message)
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        print('chat_message', json.dumps(message))
        # Send message to WebSocket
        self.send(text_data=json.dumps(message))
