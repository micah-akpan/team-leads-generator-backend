const Users = [
    {
        id: 1,
        name: 'User 1',
        served: true,
        termStartDate: null,
        termEndDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 5),
        role: 'team lead'
    },

    {
        id: 2,
        name: 'User 2',
        served: false,
        termStartDate: null,
        termEndDate: null,
        role: ''
    },

    {
        id: 3,
        name: 'User 3',
        served: false,
        termStartDate: null,
        termEndDate: null,
        role: ''
    }
]

module.exports = Users;