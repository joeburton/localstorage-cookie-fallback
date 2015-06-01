#Local Storage and Cookie fallback

**Store**

memory.storeValue('PersonalDetails', JSON.stringify({'name': 'Joe Burton', 'age': 35, 'nationality': 'British'}));

**Read**

var joe = memory.readValue('PersonalDetails')

**Parse**

JSON.parse(joe)
