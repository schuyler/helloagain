# helloagain

HelloAgain is a mobile app intended to remind you to stay in touch with the
people you care about most.

# Architecture

HelloAgain is built on React Native and is designed around Redux.

## State tree

```
{
  contacts: { recordID1: { ... }, ... },
  friends: { recordID1: { ... }, ... },
  settings: { ... }
}
```

* Every change to `friends` should trigger a merge of that object to the corresponding object in `contacts`
* `contacts` should NOT be persisted -- we do not want to duplicate the entire addressbook

## Components

* ContactList
* ContactItem
* ContactDetail

## Containers

* ContactPicker
* ContactQueue
* Settings
