

const messagesFields = {
	id: { type: 'id', label: 'ID' },
text: { type: 'string', label: 'Text',

    },
from_user: { type: 'relation_one', label: 'From_user',

    },
chat_room: { type: 'relation_one', label: 'Chat_room',

    },
to_user: { type: 'relation_one', label: 'To_user',

    },

}

export default messagesFields;
