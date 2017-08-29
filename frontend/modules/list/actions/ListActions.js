import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config'
import AppDispatcher from '../../common/AppDispatcher';
import ListConstants from '../constants/ListConstants';

class ListActions {
  add(title) {
    request()
      .post(serverURLs.list)
      .send({ title: title })
      .end((err, res) => {
        if (!err && res) {
          AppDispatcher.dispatch({
            actionType: ListConstants.LIST_ADD,
            id: res.body.id,
            title: res.body.title
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  save(id, title) {
    request()
      .patch(serverURLs.list + id + "/")
      .send({ title: title })
      .end((err, res) => {
        if (!err && res) {
          AppDispatcher.dispatch({
            actionType: ListConstants.LIST_SAVE,
            title: res.body.title
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  destroy(id) {
    request()
      .delete(serverURLs.list + id + "/")
      .end((err, res) => {
        if (!err && res) {
          AppDispatcher.dispatch({
            actionType: ListConstants.LIST_DELETE,
            id: id,
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  load(id) {
    request()
      .get(serverURLs.list + id + '/')
      .end((err, res) => {
        if (!err && res) {
          AppDispatcher.dispatch({
            actionType: ListConstants.LIST_INIT,
            id: res.body.id,
            title: res.body.title,
            item_count: res.body.item_count
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }

  init(active_list_id) {
    request()
      .get(serverURLs.list)
      .end((err, res) => {
        if (!err && res) {
          AppDispatcher.dispatch({
            actionType: ListConstants.LIST_INIT,
            lists: res.body.results,
            active_list_id: active_list_id,
          });
        } else {
          console.error(err.toString());
          console.error(res.body);
          this.error(res.body);
        }
      });
  }
}

const ListAction = new ListActions();

export default ListAction;
