import request from 'superagent';
import AppDispatcher from '../../common/AppDispatcher';
import AuthStore from '../../account/stores/AuthStore';
import { ItemStore } from '../stores/ItemStore';
import ItemConstants from '../constants/ItemConstants';
import ListConstants from '../constants/ListConstants';
import { serverURLs } from '../../common/config'

class ItemActions {
  load_list(id) {
    request
      .get(serverURLs.list_item + '?list=' + id)
      .set('Authorization', 'Token ' + AuthStore.getToken())
      .end((err, res) => {
        if (!err && res) {
          this.init(id, res.body);
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  save_list(data) {
    let r = 'id' in data ?
      request.put(serverURLs.list + data.id + '/') :
      request.post(serverURLs.list) ;

    r.send(data)
      .set('Authorization', 'Token ' + AuthStore.getToken())
      .end((err, res) => {
        if (!err && res) {
          var id = res.body.id;
          this.handleSubmit(res.body.id);
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  save_item(data) {
    let r = 'id' in data ?
      request.put(serverURLs.list_item + data.id + '/') :
      request.post(serverURLs.list_item) ;

    r.send(data)
      .set('Authorization', 'Token ' + AuthStore.getToken())
      .end((err, res) => {
        if (!err && res) {
          var id = res.body.id;
          this.handleSubmit(res.body.id);
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  addItem(title) {
    request
      .post(serverURLs.list_item)
      .send({
        title: title,
        list: ItemStore.getKey()
      })
      .set('Authorization', 'Token ' + AuthStore.getToken())
      .end((err, res) => {
        if (!err && res) {
          AppDispatcher.dispatch({
            actionType: ItemConstants.ITEM_ADD,
            data: res.body
          });
          AppDispatcher.dispatch({
            actionType: ListConstants.LIST_UPDATE_COUNT,
            increment: 1
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  save(item, text) {
    request
      .patch(serverURLs.list_item + item.id + "/")
      .send({ title: text })
      .set('Authorization', 'Token ' + AuthStore.getToken())
      .end((err, res) => {
        if (!err && res) {
          AppDispatcher.dispatch({
            actionType: ItemConstants.ITEM_SAVE,
            item: item,
            text: res.body.title
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  toggle(item) {
    request
      .patch(serverURLs.list_item + item.id + "/")
      .send({ completed: !item.completed })
      .set('Authorization', 'Token ' + AuthStore.getToken())
      .end((err, res) => {
        if (!err && res) {
          AppDispatcher.dispatch({
            actionType: ItemConstants.ITEM_TOGGLE,
            item: item,
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  toggleAll(checked) {
    request
      .patch(serverURLs.bulk_list_item)
      .send(ItemStore.getToogleItems(checked))
      .set('Authorization', 'Token ' + AuthStore.getToken())
      .end((err, res) => {
        if (!err && res) {
          AppDispatcher.dispatch({
            actionType: ItemConstants.ITEM_TOGGLE_ALL,
            checked: checked
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  destroy(item) {
    request
      .delete(serverURLs.list_item + item.id + "/")
      .set('Authorization', 'Token ' + AuthStore.getToken())
      .end((err, res) => {
        if (!err && res) {
          AppDispatcher.dispatch({
            actionType: ItemConstants.ITEM_DELETE,
            item: item,
          });
          AppDispatcher.dispatch({
            actionType: ListConstants.LIST_UPDATE_COUNT,
            increment: -1
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  clearCompleted() {
    var ids = ItemStore.getCheckedItems();
    request
      .delete(serverURLs.bulk_list_item)
      .send(ids)
      .set('Authorization', 'Token ' + AuthStore.getToken())
      .end((err, res) => {
        if (!err && res) {
          AppDispatcher.dispatch({
            actionType: ItemConstants.ITEM_DELETE_COMPLETED,
          });
          AppDispatcher.dispatch({
            actionType: ListConstants.LIST_UPDATE_COUNT,
            increment: -ids.length
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  init(id, list) {
    AppDispatcher.dispatch({
      actionType: ItemConstants.ITEM_INIT,
      id: id,
      list: list
    });
  }
}

const ItemAction = new ItemActions();

export default ItemAction;
