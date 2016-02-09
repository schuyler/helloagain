# helloagain

HelloAgain is a mobile app intended to remind you to stay in touch with the
people you care about most.

# Architecture

HelloAgain is built on React Native and is designed around Redux.

## State tree

```
{
  contacts: { recordID1: { ..., activity: {...} }, ... },
  activity: { recordID1: { ... }, ... },
  settings: { ... }
}
```

* The `activity` object tracks the app's internal state for each contact.
* Every change to `activity` should update the reference on the corresponding object in `contacts`
* `contacts` should NOT be persisted -- we do not want to duplicate the entire addressbook

## Components

* ContactList
* ContactItem
* ContactDetail

## Containers

* ContactPicker
* ContactQueue
* Settings
