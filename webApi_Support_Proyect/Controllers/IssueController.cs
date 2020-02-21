            using (var ctx = new Entities()) {
                ctx.Issue.Add(new Issue() {
                    Report_Number = issue.Report_Number,
                    Id_Supporter = issue.Id_Supporter,
                    Classification = issue.Classification,
                    Status = issue.Status,
                    Report_Time=issue.Report_Time,
                    Resolution_Comment= issue.Resolution_Comment
                });
                ctx.SaveChanges();