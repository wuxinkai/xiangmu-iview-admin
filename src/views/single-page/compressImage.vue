<template>
  <div>

    <Row :gutter="16">
      <Col span="12">
      <List border>
        <ListItem v-for="item in listCon">
          <ListItemMeta :description="item.name" />
          <template slot="action">
            <li>
              <i>{{item.nick}}</i>
            </li>
          </template>
        </ListItem>
      </List>
      </Col>
      <Col span="12">
      <List border>
        <ListItem v-for="item in listCon1">
          <ListItemMeta :description="item.name" />
          <template slot="action">
            <li>
              <i>{{item.nick}}</i>
            </li>
          </template>
        </ListItem>
      </List>
      </Col>

    </Row>

  </div>
</template>
<script>

import userList from "../../assets/json/userList";
import userList2 from "../../assets/json/userList2";
export default {
  data() {
    return {
      url: '',
      listCon: [],
      listCon1: [],
      listCon2: [],
    }
  },
   mounted() {
    console.log(userList)
    this.listCon = userList.first
    this.listCon1 = userList2.last
 

  

  },
  methods: {
  }
}
</script>