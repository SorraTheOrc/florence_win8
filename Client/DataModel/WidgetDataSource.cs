using WookieService;

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Windows.Storage;

namespace Client.DataModel
{
    class WidgetDataSource
    {

        private ObservableCollection<Widget> _Widgets = new ObservableCollection<Widget>();
        public ObservableCollection<Widget> Widgets
        {
            get
            {
                return this._Widgets;
            }
        }

        public async System.Threading.Tasks.Task load()
        {
            StorageFolder appFolder = Windows.ApplicationModel.Package.Current.InstalledLocation;
            StorageFolder widgetsFolder = await appFolder.GetFolderAsync("widget");
            IReadOnlyList<StorageFolder> widgetFolders = await widgetsFolder.GetFoldersAsync();
            int idx = 0;

            foreach (var folder in widgetFolders)
            {
                XNamespace ns = "http://www.w3.org/ns/widgets";
                StorageFile configFile = await folder.GetFileAsync("config.xml");
                var confXML = await FileIO.ReadTextAsync(configFile, Windows.Storage.Streams.UnicodeEncoding.Utf8);
                var doc = XElement.Load(configFile.Path);
                var title = doc.Element(ns + "name").Value;
                var icon = doc.Element(ns + "icon").Attribute("src").Value;
                var uid = doc.Attribute("id").Value;
                var desc = doc.Element(ns + "description").Value;
                var content = doc.Element(ns + "content").Attribute("src").Value;
                var path = folder.Name;
                this.Widgets.Add(new Widget(uid, title, desc, icon, path, content));
                idx++;
            }
        }

        /**
         * Get the widget with a given UID
         */
        internal Widget get(string uid)
        {
            Widget widget = null;
            foreach (Widget w in this.Widgets) {
                if (w.Guid.Equals(uid))
                {
                    widget = w;
                    break;
                }
            };
            return widget;
        }
    }
}
