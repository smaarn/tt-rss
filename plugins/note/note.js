Plugins.Note = {
	edit: function(id) {
		const query = "backend.php?op=pluginhandler&plugin=note&method=edit&param=" + encodeURIComponent(id);

		if (dijit.byId("editNoteDlg"))
			dijit.byId("editNoteDlg").destroyRecursive();

		const dialog = new dijit.Dialog({
			id: "editNoteDlg",
			title: __("Edit article note"),
			style: "width: 600px",
			execute: function () {
				if (this.validate()) {
					Notify.progress("Saving article note...", true);

					xhrJson("backend.php", this.attr('value'), (reply) => {
						Notify.close();
						dialog.hide();

						if (reply) {
							ArticleCache.del(id);

							var elem = $("POSTNOTE-" + id);

							if (elem) {
								Element.hide(elem);
								elem.innerHTML = reply.note;

								if (reply.raw_length != 0)
									new Effect.Appear(elem);
							}
						}
					});
				}
			},
			href: query,
		});

		dialog.show();
	}
};