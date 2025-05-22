export const UsersList = ({ users, selectedUserId, onSelect }) => (
  <div className="panel-tabs has-text-weight-bold">
    <a
      href="#/"
      data-cy="FilterAllUsers"
      onClick={() => onSelect(null)}
      className={selectedUserId === null ? 'is-active' : ''}
    >
      All
    </a>

    {users.map(user => (
      <a
        key={user.id}
        href="#/"
        data-cy="FilterUser"
        onClick={() => onSelect(user.id)}
        className={selectedUserId === user.id ? 'is-active' : ''}
      >
        {user.name}
      </a>
    ))}
  </div>
);
