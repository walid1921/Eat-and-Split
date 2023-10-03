import { useState } from "react";
import initialFriends from './assets/data'
import Button from "./components/Button";
import FriendList from "./components/FriendList";
import FormAddFriend from './components/FormAddFriend'
import FormSplitBill from "./components/FormSplitBill";


export default function App() {
  const [showForm, setShowForm] = useState(false)

  const [friends, setFriends] = useState(initialFriends)


  const [selectedFriend, setSelectedFriend] = useState(null)

  function handleSelection(friend) {
    setSelectedFriend(cur => cur?.id === friend.id ? null : friend)

    setShowForm(false)

  }

  const handleAddFriend = (newFriend) => {
    setFriends((friends) => [...friends, newFriend]
    )

    // here to just close the form after submitting the form
    setShowForm(false)
  }

  const handleSplit = (value) => {

    setFriends(friends => friends.map(friend => friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + value } : friend))

    setSelectedFriend(null)


  }



  return (
    <h1 className="app">

      <div className="sidebar">

        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection} />


        {showForm &&
          <FormAddFriend
            handleAddFriend={handleAddFriend} />}

        <Button onClick={() => setShowForm(show => !show)} >{!showForm ? 'Add friend' : 'Close'}</Button>

      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} handleSplit={handleSplit} />}

    </h1>
  )
}








